import Task from '../models/task.js'
import User from '../models/user.js'
import { handleHttp } from '../utils/error.handle.js'

export class TaskController {
    static async createTask(req, res) {
        const { title, description } = req.body
        const { userId } = req.params
        try {
            const newTask = new Task({
                title,
                description,
                user: userId
            })
            const savedTask = await newTask.save()

            await User.findByIdAndUpdate(userId, {
                $push: { tasks: savedTask._id },
                updatedAt: new Date()
            }, { new: true })

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
        const { id } = req.params
        try {
            const tasks = await Task.find({ user: id })
            res.send( tasks )
        } catch (error) {
            handleHttp(res, 'ERROR_GET_TASKS', error)
        }
    }

    static async getTask(req, res) {
        const { id, userId } = req.params
        try {
            const task = await Task.findOne({ _id: id, user: userId })
            res.send(task)
        } catch (error) {
            handleHttp(res, 'ERROR_GET_TASK', error)
        }
    }

    static async updateTask(req, res) {
        const { id } = req.params
        const { completed } = req.body
        try {
            const updatedTask = await Task.findByIdAndUpdate(id, {
                completed,
                updatedAt: new Date()
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

            await User.findByIdAndUpdate(deletedTask.user, {
                $pull: { tasks: deletedTask._id },
                updatedAt: new Date()
            })

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