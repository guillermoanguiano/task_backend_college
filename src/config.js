import dotenv from 'dotenv'

dotenv.config()

export default {
    PORT: process.env.PORT || 3005,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET
}