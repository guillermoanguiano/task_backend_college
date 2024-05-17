import { API_URL } from "./consts";

export const createSong = async (data, userId) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await response.json()
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getSong = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${userId}`, {
            cache: 'no-store'
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteSong = async (id) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}