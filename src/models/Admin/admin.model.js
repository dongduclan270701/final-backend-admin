import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'

const employeeCollectionName = 'admin'
const employeeCollectionSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    address: Joi.string().default(''),
    phoneNumber: Joi.number().required(),
    dateOfBirth: Joi.string().required(),
    role: Joi.string().required(),
    email: Joi.string().required(),
    image: Joi.string().default('https://res.cloudinary.com/dolydpat4/image/upload/v1686057536/user_318-644325_gawofq.avif'),
    identity: Joi.number().default(0),
    salary: Joi.number().default(0),
    curriculumVitae: Joi.string().default(''),
    createdAt: Joi.date().timestamp().default(Date.now()),
    createdBy: Joi.object().default({}),
    updatedAt: Joi.date().timestamp().default(null),
    updatedBy: Joi.array().items(Joi.object()).default([]),
    reasonUpdate: Joi.string().default(''),
    status: Joi.boolean().default(true),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await employeeCollectionSchema.validateAsync(data, { abortEarly: false }) // Hiển thị đầy đủ lỗi nếu trong trường data có 2 field trở lên bị lỗi
}

const createNewEmployee = async (data, role) => {
    try {
        const newData = { ...data, createdBy: { role: role.role, email: role.email, username: role.username } }
        const value = await validateSchema(newData)
        const dataFind = await getDB().collection(employeeCollectionName).aggregate([
            {
                $match: {
                    email: value.email,
                    _destroy: false
                }
            }
        ]).toArray()
        if (dataFind.length > 0) {
            return { message: 'Email already exists' }
        } else {
            const result = await getDB().collection(employeeCollectionName).insertOne(value)
            return result
        }
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(employeeCollectionName).findOne({ _id: ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const updateEmployee = async (id, data, role) => {
    try {
        const date = new Date();
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const time = `${hours}:${minutes}`;
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const today = `${year}-${month}-${day}`;
        const updateData = {
            ...data,
            updatedAt: Date.now(),
            updatedBy: [
                ...data.updatedBy,
                {
                    role: role.role,
                    email: role.email,
                    username: role.username,
                    reasonUpdate: data.reasonUpdate,
                    date: today,
                    time: time
                }
            ]
        }
        const { _id, ...newData } = updateData
        const updateUser = await getDB().collection(employeeCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: newData },
            { returnDocument: 'after' }
        )
        return updateUser.value
    } catch (error) {
        throw new Error(error)
    }
}

const updateStatusEmployee = async (email, data) => {
    try {
        const updateUser = await getDB().collection(employeeCollectionName).findOneAndUpdate(
            { email: email },
            { $set: { status: data.status } },
            { returnDocument: 'after' }
        )
        return updateUser.value
    } catch (error) {
        throw new Error(error)
    }
}

const loginEmployee = async (email) => {
    try {
        const result = await getDB().collection(employeeCollectionName).aggregate([
            {
                $match: {
                    email: email,
                    _destroy: false
                }
            }
        ]).toArray()
        return result[0] || { message: 'Not found employee' }
    } catch (error) {
        throw new Error(error)
    }
}

const getInformationEmployee = async (employeeId) => {
    try {
        const result = await getDB().collection(employeeCollectionName).aggregate([
            {
                $match: {
                    _id: ObjectId(employeeId),
                    _destroy: false
                }
            }
        ]).toArray()
        return result[0] || { message: 'Not found employee' }
    } catch (error) {
        throw new Error(error)
    }
}

const getAllEmployee = async (data, role) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        const result = await getDB().collection(employeeCollectionName).find().limit(perPage).skip((perPage * page) - perPage).toArray()
        const resultTotal = await getDB().collection(employeeCollectionName).find().toArray()
        return { data: [...result], total: resultTotal.length, role: role.role }
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchEmployee = async (data) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        let status = data.status
        if (status === '') {
            status = { $in: [true, false] }
        } else {
            status = status === 'true' ? true : false
        }
        const result = await getDB().collection(employeeCollectionName).aggregate([
            {
                $match: {
                    email: { $regex: new RegExp(`${data.email}`) },
                    role: { $regex: new RegExp(`${data.role}`) },
                    status: status,
                    _destroy: false
                }
            }
        ]).skip((perPage * page) - perPage).limit(perPage).toArray()
        const resultTotal = await getDB().collection(employeeCollectionName).aggregate([
            {
                $match: {
                    email: { $regex: new RegExp(`${data.email}`) },
                    role: { $regex: new RegExp(`${data.role}`) },
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

export const AdminModel = {
    getAllEmployee,
    createNewEmployee,
    getInformationEmployee,
    loginEmployee,
    updateEmployee,
    findOneById,
    updateStatusEmployee,
    getSearchEmployee
}