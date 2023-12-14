import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'

// Define Board collection
const laptopGamingCollectionName = 'laptop-gaming'
const laptopGamingCollectionSchema = Joi.object({
    img: Joi.array().items(Joi.string()).required(),
    src: Joi.string().required(),
    gift: Joi.array().required().items(Joi.string()),
    gift_buy: Joi.array().required().items(Joi.string()),
    percent: Joi.number().min(0).max(100).required(),
    quantity: Joi.number().integer().min(0).required(),
    sold: Joi.number().integer().min(0).default(0),
    view: Joi.number().integer().min(0).default(0),
    nameProduct: Joi.string().required().required(),
    realPrice: Joi.number().min(0).required(),
    nowPrice: Joi.number().min(0).required(),
    description_table: Joi.array().required().items(Joi.array().ordered(Joi.string(), Joi.string())),
    description: Joi.array().required().items(Joi.array().ordered(Joi.string(), Joi.string())),
    specifications: Joi.array().required().items(Joi.array().ordered(Joi.string(), Joi.string())),
    category: Joi.array().required().items(Joi.string()),
    collection: Joi.string().default(laptopGamingCollectionName),
    rating: Joi.array().items(Joi.object()).default([]),
    chat: Joi.array().items(Joi.object()).default([]),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
    importCost: Joi.number().integer().min(0).default(0),
    viewInMonth: Joi.array().default([]),
    viewInYear: Joi.array().default([]),
    soldInMonth: Joi.array().default([]),
    soldInYear: Joi.array().default([])
})

const validateSchema = async (data) => {
    return await laptopGamingCollectionSchema.validateAsync(data, { abortEarly: false }) // Hiển thị đầy đủ lỗi nếu trong trường data có 2 field trở lên bị lỗi
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        // const dataFind = await getDB().collection(laptopGamingCollectionName).aggregate([
        //     {
        //         $match: {
        //             email: value.email,
        //             _destroy: false
        //         }
        //     }
        // ]).toArray()
        // if (dataFind.length > 0) {
        //     return { message: 'Email đã tồn tại' }
        // } else {
        const result = await getDB().collection(laptopGamingCollectionName).insertOne(value)
        return result
        // }
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(laptopGamingCollectionName).findOne({ _id: ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (src, data) => {
    try {
        const updateData = {
            ...data
        }
        const srcGet = src
        const updateUser = await getDB().collection(laptopGamingCollectionName).findOneAndUpdate(
            { src: srcGet },
            { $set: updateData },
            { returnDocument: 'after' }
        )
        return updateUser.value
    } catch (error) {
        throw new Error(error)
    }
}


const getFullLaptopGamingCollecting = async (data, role) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            return 0
        } else {
            const result = await getDB().collection(laptopGamingCollectionName).find().limit(perPage).skip((perPage * page) - perPage).toArray()
            const resultTotal = await getDB().collection(laptopGamingCollectionName).find().toArray()
            return { data: [...result], total: resultTotal.length, role: role.role }
        }

    } catch (error) {
        throw new Error(error)
    }
}


const getFullLaptopGamingInformationAdmin = async (src) => {
    try {
        const result = await getDB().collection(laptopGamingCollectionName).aggregate([
            {
                $match: {
                    src: src,
                    _destroy: false
                }
            }
        ]).toArray()
        return result[0] || { message: 'Not found goods' }
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchLaptopGamingInformation = async (data) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        const filteredCategory = data.category.filter(Boolean)
        const result = await getDB().collection(laptopGamingCollectionName).aggregate([
            {
                $match: {
                    nameProduct: { $regex: new RegExp(data.nameProduct, 'i') },
                    category: filteredCategory.length > 0 ? { $all: filteredCategory } : { $exists: true },
                    _destroy: false
                }
            },
            {
                $sort: { quantity: data.sort === 'asc' ? 1 : -1 }
            }
        ]).skip((perPage * page) - perPage).limit(perPage).toArray()
        const resultTotal = await getDB().collection(laptopGamingCollectionName).aggregate([
            {
                $match: {
                    nameProduct: { $regex: new RegExp(data.nameProduct, 'i') },
                    category: filteredCategory.length > 0 ? { $all: filteredCategory } : { $exists: true },
                    _destroy: false
                }
            }
        ]).toArray()
        return { data: [...result], total: resultTotal.length };
    } catch (error) {
        throw new Error(error)
    }
}
export const laptopGamingCollectingModel = {
    createNew,
    getFullLaptopGamingInformationAdmin,
    getFullLaptopGamingCollecting,
    update,
    findOneById,
    getSearchLaptopGamingInformation
}