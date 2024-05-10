import bcrypt from 'bcrypt'
import { handleHttp } from "../utils/error.handle.js"
import User from "../models/user.js"

export class UserController {

    static async checkIfUserExists() {
        return true
    }

    static async registerUser({ body }, res) {
        const { name, email, password } = body
        try {
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
        res.send('loginUser')
    }

}