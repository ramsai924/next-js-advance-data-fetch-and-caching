import ApiServiceMethods from "@/utils/api"

const api = new ApiServiceMethods()

export const getMessages = async (token: string) => {
    try {
        const response = await api.GET(`http://localhost:3000/api/messages`, token, { next : { tags: ['get-messages'] }})
        if(response.data && response.data.length){
            return response.data
        }
    } catch (error: any) {
        throw error
    }
}

export const sendUserMessage = async (data: any, token: string) => {
    try {
        const response = await api.POST(`http://localhost:3000/api/messages`, data, token)
        // await new Promise((res: any, rej: any) => setTimeout(() => {
        //     res()
        // }, 3000)) 
        return response
    } catch (error: any) {
        throw error
    }
}

export const deleteUserMessage = async (mesaageId: any) => {
    try {
        const response = await api.DELETE(`http://localhost:3000/api/messages/${mesaageId}`)
        // await new Promise((res: any, rej: any) => setTimeout(() => {
        //     res()
        // }, 3000))
        return response
    } catch (error: any) {
        throw error
    }
}