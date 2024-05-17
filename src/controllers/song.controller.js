import Song from '../models/song.js'
import User from '../models/user.js'
import { handleHttp } from '../utils/error.handle.js'

export class SongController {
    static async createSong(req, res) {
        const { title, description } = req.body
        const { userId } = req.params
        try {
            const newSong = new Song({
                title,
                description,
                user: userId
            })
            const savedSong = await newSong.save()

            await User.findByIdAndUpdate(userId, {
                $push: { songs: savedSong._id },
                updatedAt: new Date()
            }, { new: true })

            res.send({
                success: true,
                data: savedSong,
                message: 'Song saved successfully'
            })
        } catch (error) {
            handleHttp(res, 'ERROR_CREATE_SONG', error)
        }
    }

    static async getSongs(req, res) {
        const { id } = req.params
        try {
            const songs = await Song.find({ user: id })
            res.send( songs )
        } catch (error) {
            handleHttp(res, 'ERROR_GET_SONG', error)
        }
    }

    static async deleteSong(req, res) {
        const { id } = req.params
        try {
            const deletedSong = await Song.findByIdAndDelete(id)

            await User.findByIdAndUpdate(deletedSong.user, {
                $pull: { songs: deletedSong._id },
                updatedAt: new Date()
            })

            res.send({
                success: true,
                data: deletedSong,
                message: 'Song deleted successfully'
            })
        } catch (error) {
            handleHttp(res, 'ERROR_DELETE_SONG', error)
        }
    }
}