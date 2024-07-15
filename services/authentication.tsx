import ApiServiceMethods from "@/utils/api";

const api = new ApiServiceMethods()

export const registerUserService = async (userData: any) => {
    try {
        const response = await api.POST(`http://localhost:3000/api/auth/register`,userData, '')

        return response
    } catch (error) {
        throw error
    }
}


export const loginUserService = async (userData: any) => {
    try {
        const response = await api.POST(`http://localhost:3000/api/auth/login`, userData, '')

        return response
    } catch (error) {
        throw error
    }
}