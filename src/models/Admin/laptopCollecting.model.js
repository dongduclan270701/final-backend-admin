import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'

// Define Board collection
const laptopCollectionName = 'laptop'
const laptopCollectionSchema = Joi.object({
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
    collection: Joi.string().default(laptopCollectionName),
    rating: Joi.array().items(Joi.object()),
    chat: Joi.array().items(Joi.object()),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
    importCost: Joi.number().integer().min(0).default(0),
    viewInMonth: Joi.array().items(Joi.number()),
    viewInYear: Joi.array().items(Joi.number()),
    soldInMonth: Joi.array().items(Joi.number()),
    soldInYear: Joi.array().items(Joi.number())
})

const validateSchema = async (data) => {
    return await laptopCollectionSchema.validateAsync(data, { abortEarly: false }) // Hiển thị đầy đủ lỗi nếu trong trường data có 2 field trở lên bị lỗi
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        // const dataFind = await getDB().collection(laptopCollectionName).aggregate([
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
        const result = await getDB().collection(laptopCollectionName).insertOne(value)
        return result
        // }
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(laptopCollectionName).findOne({ _id: ObjectId(id) })
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
        const updateUser = await getDB().collection(laptopCollectionName).findOneAndUpdate(
            { src: srcGet },
            { $set: updateData },
            { returnDocument: 'after' }
        )
        return updateUser.value
    } catch (error) {
        throw new Error(error)
    }
}


const getFullLaptopCollecting = async (data, role) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        if (role.role === 'CEO') {
            const [
                resultTotalGoods,
                resultTotalGoodsOutStock,
                resultTotalGoodsAvailable,
                totalSoldAndProfit,
                totalSoldInYear,
                totalView,
                totalViewInYear,
                totalSoldByDay,
                totalViewByDay
            ] = await Promise.all([
                getDB().collection(laptopCollectionName).find().toArray(),
                getDB().collection(laptopCollectionName).aggregate([
                    {
                        $match: {
                            quantity: 0,
                            _destroy: false
                        }
                    }
                ]).toArray(),
                getDB().collection(laptopCollectionName).aggregate([
                    {
                        $match: {
                            quantity: { $gt: 0 },
                            _destroy: false
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalImportCost: { $sum: '$importCost' }
                        }
                    }
                ]).toArray(),
                getDB().collection(laptopCollectionName).aggregate([
                    { $unwind: '$soldInMonth' },
                    {
                        $group: {
                            _id: null,
                            totalSold: { $sum: '$soldInMonth.sold' },
                            totalProfit: {
                                $sum: {
                                    $multiply: [
                                        '$soldInMonth.sold',
                                        { $subtract: ['$nowPrice', '$importCost'] }
                                    ]
                                }
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 0
                        }
                    }
                ]).toArray(),
                getDB().collection(laptopCollectionName).aggregate([
                    { $unwind: '$soldInYear' },
                    {
                        $group: {
                            _id: null,
                            totalSoldInYear: { $sum: '$soldInYear.sold' }
                        }
                    },
                    {
                        $project: {
                            _id: 0
                        }
                    }
                ]).toArray(),
                getDB().collection(laptopCollectionName).aggregate([
                    { $unwind: '$viewInMonth' },
                    {
                        $group: {
                            _id: null,
                            totalView: { $sum: '$viewInMonth.view' }
                        }
                    },
                    {
                        $project: {
                            _id: 0
                        }
                    }
                ]).toArray(),
                getDB().collection(laptopCollectionName).aggregate([
                    { $unwind: '$viewInYear' },
                    {
                        $group: {
                            _id: null,
                            totalViewInYear: { $sum: '$viewInYear.view' }
                        }
                    },
                    {
                        $project: {
                            _id: 0
                        }
                    }
                ]).toArray(),
                getDB().collection(laptopCollectionName).aggregate([
                    { $unwind: '$soldInMonth' },
                    {
                        $group: {
                            _id: '$soldInMonth.day',
                            totalSold: { $sum: '$soldInMonth.sold' }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            day: '$_id',
                            totalSold: 1
                        }
                    },
                    {
                        $sort: { day: 1 }
                    }
                ]).toArray(),
                getDB().collection(laptopCollectionName).aggregate([
                    { $unwind: '$viewInMonth' },
                    {
                        $group: {
                            _id: '$viewInMonth.day',
                            totalView: { $sum: '$viewInMonth.view' }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            day: '$_id',
                            totalView: 1
                        }
                    },
                    {
                        $sort: { day: 1 }
                    }
                ]).toArray()
            ])
            return {
                total: resultTotalGoods.length,
                totalOutStock: resultTotalGoodsOutStock.length,
                totalAvailable: resultTotalGoodsAvailable[0].totalImportCost,
                totalSold: totalSoldAndProfit[0].totalSold,
                totalProfit: totalSoldAndProfit[0].totalProfit,
                totalView: totalView[0].totalView,
                totalSoldInYear: totalSoldInYear[0].totalSoldInYear,
                totalViewInYear: totalViewInYear[0].totalViewInYear,
                totalSoldByDay: totalSoldByDay,
                totalViewByDay: totalViewByDay,
                role: role.role
            }
        } else {
            const result = await getDB().collection(laptopCollectionName).find().limit(perPage).skip((perPage * page) - perPage).toArray()
            const resultTotal = await getDB().collection(laptopCollectionName).find().toArray()
            return { data: [...result], total: resultTotal.length, role: role.role }
        }

    } catch (error) {
        throw new Error(error)
    }
}

const getTotalGoods = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotalGoods
            ] = await Promise.all([
                getDB().collection(laptopCollectionName).find().toArray()
            ])
            return {
                total: resultTotalGoods.length,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalOutOfStock = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotalGoodsOutStock
            ] = await Promise.all([
                getDB().collection(laptopCollectionName).aggregate([
                    {
                        $match: {
                            quantity: 0,
                            _destroy: false
                        }
                    }
                ]).toArray()
            ])
            return {
                totalOutStock: resultTotalGoodsOutStock.length,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalAInStock = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotalGoodsAvailable,
                resultTotalInStock
            ] = await Promise.all([
                getDB().collection(laptopCollectionName).aggregate([
                    {
                        $match: {
                            quantity: { $gt: 0 },
                            _destroy: false
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalImportCost: { $sum: '$importCost' }
                        }
                    }
                ]).toArray(),
                getDB().collection(laptopCollectionName).aggregate([
                    {
                        $match: {
                            quantity: { $gt: 0 },
                            _destroy: false
                        }
                    }
                ]).toArray()
            ])
            return {
                totalInStock: resultTotalInStock.length,
                totalAvailable: resultTotalGoodsAvailable[0].totalImportCost,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalSoldAndProfitOfMonth = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                totalSoldAndProfit
            ] = await Promise.all([
                getDB().collection(laptopCollectionName).aggregate([
                    { $unwind: '$soldInMonth' },
                    {
                        $group: {
                            _id: null,
                            totalSold: { $sum: '$soldInMonth.sold' },
                            totalProfit: {
                                $sum: {
                                    $multiply: [
                                        '$soldInMonth.sold',
                                        { $subtract: ['$nowPrice', '$importCost'] }
                                    ]
                                }
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 0
                        }
                    }
                ]).toArray()
            ])
            return {
                totalSold: totalSoldAndProfit[0].totalSold,
                totalProfit: totalSoldAndProfit[0].totalProfit,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalViewInMonth = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                totalView
            ] = await Promise.all([
                getDB().collection(laptopCollectionName).aggregate([
                    { $unwind: '$viewInMonth' },
                    {
                        $group: {
                            _id: null,
                            totalView: { $sum: '$viewInMonth.view' }
                        }
                    },
                    {
                        $project: {
                            _id: 0
                        }
                    }
                ]).toArray()
            ])
            return {
                totalView: totalView[0].totalView,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalSoldInYear = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                totalSoldInYear
            ] = await Promise.all([
                getDB().collection(laptopCollectionName).aggregate([
                    { $unwind: '$soldInYear' },
                    {
                        $group: {
                            _id: null,
                            totalSoldInYear: { $sum: '$soldInYear.sold' }
                        }
                    },
                    {
                        $project: {
                            _id: 0
                        }
                    }
                ]).toArray()
            ])
            return {
                totalSoldInYear: totalSoldInYear[0].totalSoldInYear,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalViewInYear = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                totalViewInYear
            ] = await Promise.all([
                getDB().collection(laptopCollectionName).aggregate([
                    { $unwind: '$viewInYear' },
                    {
                        $group: {
                            _id: null,
                            totalViewInYear: { $sum: '$viewInYear.view' }
                        }
                    },
                    {
                        $project: {
                            _id: 0
                        }
                    }
                ]).toArray()
            ])
            return {
                totalViewInYear: totalViewInYear[0].totalViewInYear,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalSoldByDay = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                totalSoldByDay
            ] = await Promise.all([
                getDB().collection(laptopCollectionName).aggregate([
                    { $unwind: '$soldInMonth' },
                    {
                        $group: {
                            _id: '$soldInMonth.day',
                            totalSold: { $sum: '$soldInMonth.sold' }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            day: '$_id',
                            totalSold: 1
                        }
                    },
                    {
                        $sort: { day: 1 }
                    }
                ]).toArray()
            ])
            return {
                totalSoldByDay: totalSoldByDay,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalViewByDay = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                totalViewByDay
            ] = await Promise.all([
                getDB().collection(laptopCollectionName).aggregate([
                    { $unwind: '$viewInMonth' },
                    {
                        $group: {
                            _id: '$viewInMonth.day',
                            totalView: { $sum: '$viewInMonth.view' }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            day: '$_id',
                            totalView: 1
                        }
                    },
                    {
                        $sort: { day: 1 }
                    }
                ]).toArray()
            ])
            return {
                totalViewByDay: totalViewByDay,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getCountGoodsByCategory = async (data, role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultCount
            ] = await Promise.all([
                getDB().collection(laptopCollectionName).aggregate([
                    {
                        $match: {
                            category: { $in: data.category }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                $filter: {
                                    input: '$category',
                                    as: 'cat',
                                    cond: { $in: ['$$cat', data.category] }
                                }
                            },
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $unwind: '$_id'
                    },
                    {
                        $group: {
                            _id: '$_id',
                            count: { $sum: '$count' }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            categories: { $push: { _id: '$_id', count: '$count' } }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            categories: 1
                        }
                    }
                ]).toArray()
            ])
            return {
                total: resultCount[0].categories,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getSoldProductsByCategory = async (data, role) => {
    try {
        if (role.role === 'CEO') {
            const aggregationResult = await getDB().collection(laptopCollectionName).aggregate([
                {
                    $match: {
                        category: { $in: data.category }
                    }
                },
                {
                    $addFields: {
                        category: {
                            $filter: {
                                input: '$category',
                                cond: { $in: ['$$this', data.category] }
                            }
                        }
                    }
                },
                {
                    $unwind: '$category'
                },
                {
                    $group: {
                        _id: '$category',
                        totalSold: { $sum: { $sum: '$soldInMonth.sold' } },
                        totalView: { $sum: { $sum: '$viewInMonth.view' } }
                    }
                }
            ]).toArray()
            return {
                resultSold: aggregationResult,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTopSoldProducts = async (role) => {
    try {
        if (role.role === 'CEO') {
            const limit = 10
            const aggregationResult = await getDB().collection(laptopCollectionName).aggregate([
                {
                    $project: {
                        _id: 0,
                        nameProduct: 1,
                        category: 1,
                        nowPrice: 1,
                        quantity: 1,
                        totalSold: { $sum: '$soldInMonth.sold' }
                    }
                },
                {
                    $sort: { totalSold: -1 }
                },
                {
                    $limit: limit
                }
            ]).toArray()
            return {
                topSoldProducts: aggregationResult,
                role: role.role
            };
        } else {
            return 0;
        }
    } catch (error) {
        throw new Error(error);
    }
}
const getTopViewProducts = async (role) => {
    try {
        if (role.role === 'CEO') {
            const limit = 10
            const aggregationResult = await getDB().collection(laptopCollectionName).aggregate([
                {
                    $project: {
                        _id: 0,
                        nameProduct: 1,
                        category: 1,
                        nowPrice: 1,
                        quantity: 1,
                        totalView: { $sum: '$viewInMonth.view' }
                    }
                },
                {
                    $sort: { totalView: -1 }
                },
                {
                    $limit: limit
                }
            ]).toArray()
            return {
                topViewProducts: aggregationResult,
                role: role.role
            };
        } else {
            return 0;
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getFullLaptopInformationAdmin = async (src) => {
    try {
        const result = await getDB().collection(laptopCollectionName).aggregate([
            {
                $match: {
                    src: src,
                    _destroy: false
                }
            }
        ]).toArray()
        return result[0] || { message: 'Not found user' }
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchLaptopInformation = async (data) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        const filteredCategory = data.category.filter(Boolean)
        const result = await getDB().collection(laptopCollectionName).aggregate([
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
        const resultTotal = await getDB().collection(laptopCollectionName).aggregate([
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
export const laptopCollectingModel = {
    createNew,
    getFullLaptopInformationAdmin,
    getFullLaptopCollecting,
    update,
    findOneById,
    getSearchLaptopInformation,
    getTotalGoods,
    getTotalOutOfStock,
    getTotalAInStock,
    getTotalSoldAndProfitOfMonth,
    getTotalViewInMonth,
    getTotalSoldInYear,
    getTotalViewInYear,
    getTotalSoldByDay,
    getTotalViewByDay,
    getCountGoodsByCategory,
    getSoldProductsByCategory,
    getTopSoldProducts,
    getTopViewProducts
}