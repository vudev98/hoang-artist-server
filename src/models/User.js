import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: 'Invalid Email address' })
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
})

userSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  }
  next()
})

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
    expiresIn: '365d',
  })
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error({ error: 'Invalid login credentials' })
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login credentials' })
  }
  return user
}

const User = mongoose.model('User', userSchema)

export default User
