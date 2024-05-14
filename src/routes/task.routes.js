import { Router } from 'express'
import { TaskController } from '../controllers/task.controller.js'
import { param } from 'express-validator'
import { handleValidationErrors } from '../middlewares/handleInputErrors.js'
import { validateRequiredFields } from '../utils/error.handle.js'

const router = Router()

router.post(
    '/:userId',
    ...validateRequiredFields(['title', 'description']),
    handleValidationErrors,
    TaskController.createTask
)

router.get('/:id', TaskController.getTasks)

router.get(
    '/:userId/:id',
    param('id').isMongoId().withMessage('Invalid ID'),
    handleValidationErrors,
    TaskController.getTask
)

router.put('/:id',
    param('id').isMongoId(),
    ...validateRequiredFields(['completed']),
    handleValidationErrors,
    TaskController.updateTask
)

router.delete(
    '/:id',
    param('id').isMongoId().withMessage('Invalid ID'),
    TaskController.deleteTask
)

export default router