import { Router } from 'express'
const router = Router()

//login
router.get('/', (req, res) => res.send('login'))

export default router
