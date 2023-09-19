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
                                $lte: now.toString()
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
                                $lte: lastMonth.toString()
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
        // if (role.role === 'CEO') {
        //     const currentDate = new Date()
        //     currentDate.setDate(1)
        //     const now = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0')
        //     const [
        //         resultTotalUser
        //     ] = await Promise.all([
        //         getDB().collection(collectionName).aggregate([
        //             {
        //                 $match: {
        //                     'createdDate': {
        //                         $gte: now.toString()
        //                     }
        //                 }
        //             },
        //             {
        //                 $group: {
        //                     _id: null,
        //                     count: { $sum: 1 }
        //                 }
        //             },
        //             {
        //                 $project: {
        //                     _id: 0,
        //                     count: 1
        //                 }
        //             }
        //         ]).toArray()
        //     ])
        //     return {
        //         resultTotalUser: resultTotalUser[0] ? resultTotalUser[0].count : 0,
        //         role: role.role
        //     }
        // } else {
        //     return 0
        // }
        if (role.role === 'CEO') {
            const currentDate = new Date()
            const currentMonth = currentDate.getMonth()
            const currentYear = currentDate.getFullYear()
            const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
            const startDateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-01`
            const endDateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${lastDayOfMonth.getDate().toString().padStart(2, '0')}`
            const [
                resultTotalUser
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            createdDate: {
                                $gte: startDateString,
                                $lte: endDateString
                            },
                            _destroy: false
                        }
                    },
                    {
                        $group: {
                            _id: '$createdDate',
                            countUser: { $sum: 1 }
                        }
                    },
                    {
                        $sort: { '_id': 1 }
                    }
                ]).toArray()
            ])
            return {
                resultTotalUser,
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
                            'orders.status': { $in: ['Being transported', 'Payment information confirmed', 'Delivered to the carrier', 'Ordered', 'Delivery successful'] },
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

const getTopUserHighestOrder = async (role) => {
    try {
        if (role.role === 'CEO') {
            const currentDate = new Date()
            currentDate.setDate(1)
            const now = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0')
            const resultTopUser = await getDB().collection('users').aggregate([
                {
                    $match: {
                        'orders.status': { $in: ['Being transported', 'Payment information confirmed', 'Delivered to the carrier', 'Ordered', 'Delivery successful'] },
                        'orders.shipping_process': {
                            $elemMatch: {
                                date: { $gte: now.toString() }
                            }
                        },
                        _destroy: false
                    }
                }
            ]).toArray()
            const filteredUsersData = resultTopUser.map((user) => ({
                ...user,
                orders: user.orders.filter((order) => {
                    const orderDate = new Date(order.shipping_process[0].date)
                    const comparisonDate = new Date(now.toString())
                    return orderDate >= comparisonDate
                })
            }))
            return {
                resultTopUser: filteredUsersData,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTopUserHighestValueAll = async (role) => {
    try {
        if (role.role === 'CEO') {
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
                            'orders.status': { $in: ['Being transported', 'Payment information confirmed', 'Delivered to the carrier', 'Ordered', 'Delivery successful'] }
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
const getTopUserHighestOrderAll = async (role) => {
    try {
        if (role.role === 'CEO') {
            const resultTopUser = await getDB().collection('users').aggregate([
                {
                    $match: {
                        _destroy: false
                    }
                },
                {
                    $addFields: {
                        ordersCount: { $size: '$orders' },
                        totalSumOrder: { $sum: '$orders.sumOrder' }
                    }
                },
                {
                    $sort: { ordersCount: -1 }
                },
                {
                    $limit: 10
                }
            ]).toArray()
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
    getTopUserHighestValue,
    getTopUserHighestValueAll,
    getTopUserHighestOrderAll,
    getTopUserHighestOrder
}
