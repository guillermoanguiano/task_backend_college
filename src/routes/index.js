import { Router } from 'express'
import SongRoutes from './song.routes.js'
import UserRoutes from './user.routes.js'

const router = Router()

router.use('/tasks', SongRoutes)
router.use('/users', UserRoutes)

export default router