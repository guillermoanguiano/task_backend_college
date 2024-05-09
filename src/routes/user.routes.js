import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'
import { validateRequiredFields } from '../utils/error.handle.js'
import { handleValidationErrors } from '../middlewares/handleInputErrors.js'

const router = Router()

router.post(
    '/auth', 
    ...validateRequiredFields(['email', 'password']),
    handleValidationErrors,
    UserController.loginUser
)

router.post(
    '/',
    ...validateRequiredFields(['name', 'email', 'password']),
    handleValidationErrors,
    UserController.registerUser
)

export default router