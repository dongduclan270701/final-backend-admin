import { getDB } from '*/config/mongodb.js'

// Define Board collection
const collectionName = 'users'

const getTotalUsers = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotalUser
            ] = await Promise.all([
                getDB().collection(collectionName).find().toArray()
            ])
            return {
                total: resultTotalUser.length,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalUserLoginLastMonth = async (role) => {
    try {
        if (role.role === 'CEO') {
            const currentDate = new Date()
            const now = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0')
            const lastMonth = currentDate.getFullYear() + '-' + (currentDate.getMonth()).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0')
            const [
                resultTotalUser
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            status: true,
                            'lastLogin.time': { $exists: true },
                            'lastLogin.date': {
                                $gte: lastMonth.toString(),
                                $lt: now.toString()
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            count: 1
                        }
                    }
                ]).toArray()
            ])
            return {
                resultTotalUser: resultTotalUser[0] ? resultTotalUser[0].count : 0,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalUserLoginOverMonth = async (role) => {
    try {
        if (role.role === 'CEO') {
            const currentDate = new Date()
            const lastMonth = currentDate.getFullYear() + '-' + (currentDate.getMonth()).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0')
            const [
                resultTotalUser
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            status: true,
                            'lastLogin.time': { $exists: true },
                            'lastLogin.date': {
                                $lt: lastMonth.toString()
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            count: 1
                        }
                    }
                ]).toArray()
            ])
            return {
                resultTotalUser: resultTotalUser[0] ? resultTotalUser[0].count : 0,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalUserAddGoodsToWishlist = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotalUser
            ] = await Promise.all([
                getDB().collection('cart').aggregate([
                    {
                        $match: {
                            'product': { $exists: true },
                            $expr: { $gt: [{ $size: '$product' }, 0] }
                        }
                    },
                    {
                        $count: 'total'
                    }
                ]).toArray()
            ])
            return {
                resultTotalUser: resultTotalUser[0] ? resultTotalUser[0].total : 0,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalUserPurchased = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotalUser
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            'orders': { $exists: true },
                            $expr: { $gt: [{ $size: '$orders' }, 0] }
                        }
                    },
                    {
                        $count: 'total'
                    }
                ]).toArray()
            ])
            return {
                resultTotalUser: resultTotalUser[0] ? resultTotalUser[0].total : 0,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalUserJoinInMonth = async (role) => {
    try {
        if (role.role === 'CEO') {
            const currentDate = new Date()
            currentDate.setDate(1)
            const now = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0')
            const [
                resultTotalUser
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            'createdDate': {
                                $gte: now.toString()
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            count: 1
                        }
                    }
                ]).toArray()
            ])
            return {
                resultTotalUser: resultTotalUser[0] ? resultTotalUser[0].count : 0,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalAgeUser = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotalAgeUser
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            _destroy: false
                        }
                    },
                    {
                        $group: {
                            _id: {
                                $switch: {
                                    branches: [
                                        { case: { $lte: ['$age', 20] }, then: '20-' },
                                        { case: { $and: [{ $gt: ['$age', 20] }, { $lte: ['$age', 30] }] }, then: '20-30' },
                                        { case: { $and: [{ $gt: ['$age', 30] }, { $lte: ['$age', 40] }] }, then: '30-40' },
                                        { case: { $and: [{ $gt: ['$age', 40] }, { $lte: ['$age', 50] }] }, then: '40-50' },
                                        { case: { $gt: ['$age', 50] }, then: '50+' }
                                    ],
                                    default: 'Unknown'
                                }
                            },
                            user: { $sum: 1 }
                        }
                    },
                    {
                        $sort: {
                            '_id': 1
                        }
                    }
                ]).toArray()
            ])
            const allAgeRanges = ['20-', '20-30', '30-40', '40-50', '50+']
            const mergedResult = allAgeRanges.map(range => {
                const matchingItem = resultTotalAgeUser.find(doc => doc._id === range)
                return {
                    _id: range,
                    user: matchingItem ? matchingItem.user : 0
                }
            })
            return {
                totalAgeUser: mergedResult,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalStatusUser = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotalStatusUserActive,
                resultTotalStatusUserDeactivate
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            status: true,
                            _destroy: false
                        }
                    }
                ]).toArray(),
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            status: false,
                            _destroy: false
                        }
                    }
                ]).toArray()
            ])
            return {
                totalStatusUserActive: resultTotalStatusUserActive.length,
                totalStatusUserDeactivate: resultTotalStatusUserDeactivate.length,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTopUserHighestValue = async (role) => {
    try {
        if (role.role === 'CEO') {
            const currentDate = new Date()
            currentDate.setDate(1)
            const now = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0')
            const [
                resultTopUser
            ] = await Promise.all([
                getDB().collection('users').aggregate([
                    {
                        $match: {
                            _destroy: false
                        }
                    },
                    {
                        $unwind: '$orders'
                    },
                    {
                        $match: {
                            'orders.shipping_process.date': {
                                $gte: now.toString()
                            }
                        }
                    },
                
                    {
                        $sort: { 'orders.sumOrder': -1 }
                    },
                    {
                        $group: {
                            _id: '$_id',
                            user: { $first: '$$ROOT' }
                        }
                    },
                    {
                        $replaceRoot: { newRoot: '$user' }
                    },
                    {
                        $limit: 10
                    }
                ]).toArray()
            ])
            return {
                resultTopUser,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

export const usersChartModel = {
    getTotalUsers,
    getTotalUserLoginLastMonth,
    getTotalUserLoginOverMonth,
    getTotalUserAddGoodsToWishlist,
    getTotalUserPurchased,
    getTotalUserJoinInMonth,
    getTotalAgeUser,
    getTotalStatusUser,
    getTopUserHighestValue
}