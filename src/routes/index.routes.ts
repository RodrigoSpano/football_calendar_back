import { Router } from 'express'
import googleRoutes from './google/google'

const router = Router()

router.use('/google', googleRoutes)

export default router
