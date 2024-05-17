import { Router } from 'express'
import { SongController } from '../controllers/song.controller.js'
import { param } from 'express-validator'
import { handleValidationErrors } from '../middlewares/handleInputErrors.js'
import { validateRequiredFields } from '../utils/error.handle.js'

const router = Router()

router.post(
    '/:userId',
    ...validateRequiredFields(['title', 'description']),
    handleValidationErrors,
    SongController.createSong
)

router.get('/:id', SongController.getSongs)

router.delete(
    '/:id',
    param('id').isMongoId().withMessage('Invalid ID'),
    handleValidationErrors,
    SongController.deleteSong
)

export default router