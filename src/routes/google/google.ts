import { Request, Response, Router } from 'express'
import GoogleControllers from '../../controllers/google/googleControllers'

const router = Router()
const controllers = new GoogleControllers()

router.get('/login', (req: Request, res: Response) =>
  controllers.login(req, res)
)
router.get(
  '/oauth2callback',
  (req: { query: { code: string } }, res: Response) =>
    controllers.createTokens(req, res)
)

export default router
