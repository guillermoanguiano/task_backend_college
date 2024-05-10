import Task from '../models/task.js'
import { handleHttp } from '../utils/error.handle.js'

export class TaskController {
    static async createTask({ body }, res) {
        const { title, description } = body
        try {
            const newTask = new Task({
                title,
                description
            })
            const savedTask = await newTask.save()
            res.send({
                success: true,
                data: savedTask,
                message: 'Task created successfully'
            })
        } catch (error) {
            handleHttp(res, 'ERROR_CREATE_TASK', error)
        }
    }

    static async getTasks(req, res) {
        try {
            const tasks = await Task.find({})
            res.send(tasks)
        } catch (error) {
            handleHttp(res, 'ERROR_GET_TASKS', error)
        }
    }

    static async getTask(req, res) {
        const { id } = req.params
        try {
            const task = await Task.findById(id)
            res.send(task)
        } catch (error) {
            handleHttp(res, 'ERROR_GET_TASK', error)
        }
    }

    static async updateTask(req, res) {
        const { id } = req.params
        const { title, description } = req.body
        try {
            const updatedTask = await Task.findByIdAndUpdate(id, {
                title,
                description
            })
            res.send({
                sucess: true,
                data: updatedTask,
                message: 'Task updated successfully'
            })
        } catch (error) {
            handleHttp(res, 'ERROR_UPDATE_TASK', error)
        }
    }

    static async deleteTask(req, res) {
        const { id } = req.params
        try {
            const deletedTask = await Task.findByIdAndDelete(id)
            res.send({
                success: true,
                data: deletedTask,
                message: 'Task deleted successfully'
            })
        } catch (error) {
            handleHttp(res, 'ERROR_DELETE_TASK', error)
        }
    }
}