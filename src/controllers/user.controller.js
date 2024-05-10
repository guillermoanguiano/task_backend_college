import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { handleHttp } from "../utils/error.handle.js"
import User from "../models/user.js"
import config from '../config.js'

export class UserController {
    static async checkIfUserExists(email) {
        const user = await User.findOne({ email })
        return user ? true : false
    }

    static async registerUser({ body }, res) {
        const { name, email, password } = body
        try {
            const userExists = await UserController.checkIfUserExists(email)

            if (userExists) {
                throw new Error('User already exists')
            }
            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new User({
                name,
                email,
                password: hashedPassword
            })

            const savedUser = await newUser.save()

            res.send(savedUser)
        } catch (error) {
            handleHttp(res, 'ERROR_REGISTER_USER', error)
        }
    }

    static async loginUser(req, res) {
        const { email, password } = req.body
        try {
            const user = await User.findOne({ email })

            if (!user) {
                throw new Error('User not found')
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                throw new Error('Invalid credentials')
            }

            const userData = {
                id: user._id,
                name: user.name,
                email: user.email
            }

            const accessTokenSecret = config.JWT_SECRET
            const accessToken = jwt.sign(userData, accessTokenSecret, {
                expiresIn: '1h'
            })

            res.send({ ...userData, accessToken })
        } catch (error) {
            handleHttp(res, 'ERROR_LOGIN_USER', error)
        }
    }
}