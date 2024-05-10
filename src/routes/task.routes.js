import { Router } from 'express'
import { TaskController } from '../controllers/task.controller.js'
import { param } from 'express-validator'
import { handleValidationErrors } from '../middlewares/handleInputErrors.js'
import { validateRequiredFields } from '../utils/error.handle.js'

const router = Router()

router.get('/', TaskController.getTasks)

router.get(
    '/:id',
    param('id').isMongoId().withMessage('Invalid ID'),
    handleValidationErrors,
    TaskController.getTask
)

router.post(
    '/',
    ...validateRequiredFields(['title', 'description']),
    handleValidationErrors,
    TaskController.createTask
)
router.put('/:id',
    param('id').isMongoId(),
    ...validateRequiredFields(['title', 'description', 'completed']),
    handleValidationErrors,
    TaskController.updateTask
)
router.delete(
    '/:id',
    param('id').isMongoId().withMessage('Invalid ID'),
    TaskController.deleteTask
)

export default router