import { Router } from 'express'
import TaskRoutes from './task.routes.js'
import UserRoutes from './user.routes.js'

const router = Router()

router.use('/tasks', TaskRoutes)
router.use('/users', UserRoutes)

export default router