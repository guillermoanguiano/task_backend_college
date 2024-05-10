import { Router } from 'express'
import { TaskController } from '../controllers/task.controller.js'
import { param } from 'express-validator'
import { handleValidationErrors } from '../middlewares/handleInputErrors.js'

const router = Router()

router.get('/', TaskController.getTasks)

router.get(
    '/:id', 
    param('id').isMongoId(),
    handleValidationErrors,
    TaskController.getTask
)

router.post('/', TaskController.createTask)
router.put('/:id', TaskController.updateTask)
router.delete('/:id', TaskController.deleteTask)

export default router