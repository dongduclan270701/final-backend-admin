import { getDB } from '*/config/mongodb.js'

// Define Board collection
const laptopCollectionName = 'laptop'

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
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

export const productChartModel = {
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