import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'

// Define Board collection
const userCollectionName = 'users'

const updateStatusUser = async (id, data) => {
    try {
        const updateUser = await getDB().collection(userCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: { 
                status: data.status
            } },
            { returnDocument: 'after' }
        )
        return updateUser.value
    } catch (error) {
        throw new Error(error)
    }
}


const getFullUser = async (data, role) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        const result = await getDB().collection(userCollectionName).find({}).skip((perPage * page) - perPage).limit(perPage).toArray()
        const resultTotal = await getDB().collection(userCollectionName).find({}).toArray()
        return { data: [...result], total: resultTotal.length, chartData: resultTotal, role: role.role }
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchUser = async (data) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        let status = data.status
        if (status === '') {
            status = { $in: [true, false] }
        } else {
            status = status === 'true' ? true : false
        }
        const result = await getDB().collection(userCollectionName).aggregate([
            {
                $match: {
                    email: { $regex: new RegExp(data.email, 'i') },
                    status: status,
                    _destroy: false
                }
            },
            {
                $addFields: {
                    orderCount: { $size: '$orders' }
                }
            },
            {
                $sort: { orderCount: data.sort === 'asc' ? -1 : 1 }
            }
        ]).skip((perPage * page) - perPage).limit(perPage).toArray()
        const resultTotal = await getDB().collection(userCollectionName).aggregate([
            {
                $match: {
                    email: { $regex: new RegExp(data.email, 'i') },
                    status: status,
                    _destroy: false
                }
            }
        ]).toArray()
        return { data: [...result], total: resultTotal.length }
    } catch (error) {
        throw new Error(error)
    }
}

const getUserInformation = async (id) => {
    try {
        const result = await getDB().collection(userCollectionName).aggregate([
            {
                $match: {
                    _id: ObjectId(id),
                    _destroy: false
                }
            }
        ]).toArray()
        return result[0] || { message: 'Not found user' }
    } catch (error) {
        throw new Error(error)
    }
}

export const userAdminModel = {
    getFullUser,
    getSearchUser,
    getUserInformation,
    updateStatusUser
}