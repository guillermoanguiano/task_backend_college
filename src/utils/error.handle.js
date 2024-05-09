import { body } from "express-validator"

export const validateRequiredFields = (fields) => {
    return fields.map(field => body(field).notEmpty().withMessage(`${field} is required`))
}