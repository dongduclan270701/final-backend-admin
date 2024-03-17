import { getDB } from '*/config/mongodb.js'

// Define Board collection
// const data.collection = 'laptop'

const getTotalGoods = async (data, role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const [
                resultTotalGoods
            ] = await Promise.all([
                getDB().collection(data.collection).find().toArray()
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

const getTotalOutOfStock = async (data, role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const [
                resultTotalGoodsOutStock
            ] = await Promise.all([
                getDB().collection(data.collection).aggregate([
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
const getTotalAInStock = async (data, role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const [
                resultTotalGoodsAvailable,
                resultTotalInStock
            ] = await Promise.all([
                getDB().collection(data.collection).aggregate([
                    {
                        $match: {
                            quantity: { $gt: 0 },
                            _destroy: false
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalNowPrice: { $sum: '$nowPrice' }
                        }
                    }
                ]).toArray(),
                getDB().collection(data.collection).aggregate([
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
                totalAvailable: resultTotalGoodsAvailable[0].totalNowPrice,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalSoldAndProfitOfMonth = async (data, role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const today = new Date()
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
            const currentYear = today.getFullYear();
            const firstDayOfYear = new Date(currentYear, 0, 2)
            const lastDayOfYear = new Date(currentYear, 11, 32)
            const [
                totalSoldAndProfit
            ] = await Promise.all([
                getDB().collection(data.collection).aggregate([
                    { $unwind: '$showInYear' },
                    {
                        $match: {
                            'showInYear.date': {
                                $gte: firstDayOfMonth.toISOString().slice(0, 10),
                                $lte: lastDayOfMonth.toISOString().slice(0, 10)
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalSold: { $sum: '$showInYear.sold' },
                            totalProfit: {
                                $sum: {
                                    $multiply: [
                                        '$showInYear.sold',
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
const getTotalViewInMonth = async (data, role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const today = new Date()
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
            const currentYear = today.getFullYear();
            const firstDayOfYear = new Date(currentYear, 0, 2)
            const lastDayOfYear = new Date(currentYear, 11, 32)
            const aggregationResult = await getDB().collection(data.collection).aggregate([
                {
                    $unwind: '$viewInYear' // Bung ra từng phần tử trong mảng viewInYear
                },
                {
                    $match: {
                        'viewInYear.date': {
                            $gte: firstDayOfMonth.toISOString().slice(0, 10),
                            $lte: lastDayOfMonth.toISOString().slice(0, 10)
                        }
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        nameProduct: { $first: '$nameProduct' },
                        category: { $first: '$category' },
                        nowPrice: { $first: '$nowPrice' },
                        quantity: { $first: '$quantity' },
                        totalView: { $sum: '$viewInYear.view' }
                    }
                },
                {
                    $sort: { totalView: -1 }
                }
            ]).toArray();
            return {
                totalView: aggregationResult,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalSoldInYear = async (data, role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const today = new Date()
            const currentYear = today.getFullYear();
            const firstDayOfYear = new Date(currentYear, 0, 2)
            const lastDayOfYear = new Date(currentYear, 11, 32)
            const [
                totalSoldInYear
            ] = await Promise.all([
                getDB().collection(data.collection).aggregate([
                    { $unwind: '$showInYear' },
                    {
                        $match: {
                            'showInYear.date': {
                                $gte: firstDayOfYear.toISOString().slice(0, 10),
                                $lte: lastDayOfYear.toISOString().slice(0, 10)
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            totalSoldInYear: { $sum: '$showInYear.sold' }
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
const getTotalViewInYear = async (data, role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const today = new Date()
            const currentYear = today.getFullYear();
            const firstDayOfYear = new Date(currentYear, 0, 2)
            const lastDayOfYear = new Date(currentYear, 11, 32)
            const aggregationResult = await getDB().collection(data.collection).aggregate([
                {
                    $unwind: '$viewInYear' // Bung ra từng phần tử trong mảng viewInYear
                },
                {
                    $match: {
                        'viewInYear.date': {
                            $gte: firstDayOfYear.toISOString().slice(0, 10),
                            $lte: lastDayOfYear.toISOString().slice(0, 10)
                        }
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        nameProduct: { $first: '$nameProduct' },
                        category: { $first: '$category' },
                        nowPrice: { $first: '$nowPrice' },
                        quantity: { $first: '$quantity' },
                        totalView: { $sum: '$viewInYear.view' }
                    }
                },
                {
                    $sort: { totalView: -1 }
                }
            ]).toArray();
            return {
                totalViewInYear: aggregationResult,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalSoldByDay = async (data, role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const today = new Date()
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
            const [
                totalSoldByDay
            ] = await Promise.all([
                getDB().collection(data.collection).aggregate([
                    { $unwind: '$showInYear' },
                    {
                        $match: {
                            'showInYear.date': {
                                $gte: firstDayOfMonth.toISOString().slice(0, 10),
                                $lte: lastDayOfMonth.toISOString().slice(0, 10)
                            }
                        }
                    },
                    {
                        $group: {
                            _id: '$showInYear.date',
                            totalSold: { $sum: '$showInYear.sold' }
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
                        $sort: { day: -1 }
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
const getTotalViewByDay = async (data, role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const today = new Date()
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
            const [
                totalViewByDay
            ] = await Promise.all([
                getDB().collection(data.collection).aggregate([
                    { $unwind: '$viewInYear' },
                    {
                        $match: {
                            'viewInYear.date': {
                                $gte: firstDayOfMonth.toISOString().slice(0, 10),
                                $lte: lastDayOfMonth.toISOString().slice(0, 10)
                            }
                        }
                    },
                    {
                        $group: {
                            _id: '$viewInYear.date',
                            totalView: { $sum: '$viewInYear.view' }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            date: '$_id',
                            totalView: 1
                        }
                    },
                    {
                        $sort: { date: 1 }
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
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const [
                resultCount
            ] = await Promise.all([
                getDB().collection(data.collection).aggregate([
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
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const today = new Date()
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
            const aggregationResult = await getDB().collection(data.collection).aggregate([
                {
                    $unwind: '$viewInYear' // Bung ra từng phần tử trong mảng viewInYear
                },
                {
                    $match: {
                        category: { $in: data.category },
                        'viewInYear.date': {
                            $gte: firstDayOfMonth.toISOString().slice(0, 10),
                            $lte: lastDayOfMonth.toISOString().slice(0, 10)
                        }
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
                        totalSold: { $sum: { $sum: '$showInYear.sold' } },
                        totalView: { $sum: { $sum: '$viewInYear.view' } }
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
const getTopSoldProducts = async (data, role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const limit = 10
            const today = new Date()
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
            const aggregationResult = await getDB().collection(data.collection).aggregate([
                {
                    $unwind: '$showInYear' // Bung ra từng phần tử trong mảng soldInYear
                },
                {
                    $match: {
                        'showInYear.date': {
                            $gte: firstDayOfMonth.toISOString().slice(0, 10),
                            $lte: lastDayOfMonth.toISOString().slice(0, 10)
                        }
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        nameProduct: { $first: '$nameProduct' },
                        category: { $first: '$category' },
                        nowPrice: { $first: '$nowPrice' },
                        quantity: { $first: '$quantity' },
                        totalSold: { $sum: '$showInYear.sold' }
                    }
                },
                {
                    $sort: { totalSold: -1 }
                },
                {
                    $limit: limit
                }
            ]).toArray();
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
const getTopViewProducts = async (data, role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const today = new Date()
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
            const limit = 10
            const aggregationResult = await getDB().collection(data.collection).aggregate([
                {
                    $unwind: '$viewInYear' // Bung ra từng phần tử trong mảng viewInYear
                },
                {
                    $match: {
                        'viewInYear.date': {
                            $gte: firstDayOfMonth.toISOString().slice(0, 10),
                            $lte: lastDayOfMonth.toISOString().slice(0, 10)
                        }
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        nameProduct: { $first: '$nameProduct' },
                        category: { $first: '$category' },
                        nowPrice: { $first: '$nowPrice' },
                        quantity: { $first: '$quantity' },
                        totalView: { $sum: '$viewInYear.view' }
                    }
                },
                {
                    $sort: { totalView: -1 }
                },
                {
                    $limit: limit
                }
            ]).toArray();
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
