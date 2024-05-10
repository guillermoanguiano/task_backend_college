import { API_URL } from "./consts"

export const login = async(data) => {
    try {
        const response = await fetch(API_URL + '/users/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

export const register = async(data) => {
    try {
        const response = await fetch(API_URL + '/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return await response.json()

    } catch (error) {
        console.log(error)
    }
}