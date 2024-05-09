

export class TaskController {

    static async checkIfTaskExists() {
        return true
    }

    static async createTask(req, res) {
        res.send('createTask')
    }

    static async getTasks(req, res) {
        res.send('getTasks')
    }

    static async getTask(req, res) {
        res.send('getTask')
    }

    static async updateTask(req, res) {
        res.send('updateTask')
    }

    static async deleteTask(req, res) {
        res.send('deleteTask')
    }
}