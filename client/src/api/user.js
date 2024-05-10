import { API_URL } from "./consts"

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