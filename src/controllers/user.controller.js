

export class UserController {

    static async checkIfUserExists() {
        return  true
    }

    static async registerUser(req, res) {
        res.send('registerUser')
    }

    static async loginUser(req, res) {
        res.send('loginUser')
    }
    
}