import { body } from "express-validator"
import colors from './colors.js'

export const handleHttp = (res, error, errorRaw) => {
    colors.error(errorRaw || error)
    res.status(500)
    res.send({ error })
}

export const validateRequiredFields = (fields) => {
    return fields.map(field => body(field).notEmpty().withMessage(`${field} is required`))
}