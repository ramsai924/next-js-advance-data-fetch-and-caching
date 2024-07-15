import { MongoClient } from 'mongodb'

async function ConnectionToDb(){
    try {
        const client = await MongoClient.connect('mongodb+srv://ramsaibusiness:cI4FjypGugWLGg5R@cluster0.hcrdqfo.mongodb.net/')
        return client
    } catch (error) {
        throw error
    }
}

export const getDb = async () => {
    const client = await ConnectionToDb()
    const db = client.db()
    return db;
}