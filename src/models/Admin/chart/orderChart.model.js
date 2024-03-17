import { getDB } from '*/config/mongodb.js'

// Define Board collection
const collectionName = 'order'

const getTotalOrder = async (role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const currentDate = new Date()
            currentDate.setDate(1)
            const now = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0')
            const [
                resultTotalOrder
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            status: { $in: ['Ordered', 'Being transported', 'Payment information confirmed', 'Delivered to the carrier', 'Delivery successful'] },
                            'createDate': {
                                $gte: now.toString()
                            }
                        }
                    }
                ]).toArray()
            ])
            const totalSumOrder = resultTotalOrder.reduce((acc, order) => {
                return acc + order.sumOrder
            }, 0)
            return {
                total: resultTotalOrder.length,
                totalAmount: totalSumOrder,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalOrderSuccessful = async (role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const currentDate = new Date()
            currentDate.setDate(1)
            const now = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0')
            const [
                resultTotalOrder
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            status: { $in: ['Delivery successful'] },
                            'createDate': {
                                $gte: now.toString()
                            }
                        }
                    }
                ]).toArray()
            ])
            const totalSumOrder = resultTotalOrder.reduce((acc, order) => {
                return acc + order.sumOrder
            }, 0)
            return {
                total: resultTotalOrder.length,
                totalAmount: totalSumOrder,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalOrderFailed = async (role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const currentDate = new Date()
            currentDate.setDate(1)
            const now = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0')
            const [
                resultTotalOrder
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            status: { $in: ['Delivery failed'] },
                            'createDate': {
                                $gte: now.toString()
                            }
                        }
                    }
                ]).toArray()
            ])
            const totalSumOrder = resultTotalOrder.reduce((acc, order) => {
                return acc + order.sumOrder
            }, 0)
            return {
                total: resultTotalOrder.length,
                totalAmount: totalSumOrder,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalOrderByStatus = async (role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const currentDate = new Date()
            currentDate.setDate(1)
            const now = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0')
            const resultTotalOrder = await getDB().collection(collectionName).aggregate([
                {
                    $match: {
                        status: {
                            $in: ['Being transported', 'Payment information confirmed', 'Delivered to the carrier', 'Ordered', 'Delivery successful', 'Cancel', 'Delivery failed']
                        },
                        'createDate': {
                            $gte: now.toString()
                        }
                    }
                },
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 }
                    }
                }
            ]).toArray()
            const statusCounts = {};
            ['Being transported', 'Payment information confirmed', 'Delivered to the carrier', 'Ordered', 'Delivery successful', 'Cancel', 'Delivery failed'].forEach((status) => {
                statusCounts[status] = 0
            })
            resultTotalOrder.forEach((statusObj) => {
                statusCounts[statusObj._id] = statusObj.count
            })

            return {
                statusCounts,
                role: role.role
            };
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalTopOrder = async (role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const currentDate = new Date()
            currentDate.setDate(1)
            const now = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0')
            const resultTotalOrder = await getDB().collection(collectionName).aggregate([
                {
                    $unwind: '$product'
                },
                {
                    $match: {
                        // status: { $in: ['Being transported', 'Payment information confirmed', 'Delivered to the carrier', 'Delivery successful'] },
                        status: { $in: ['Delivery successful'] },
                        createDate: {
                            $gte: now.toString()
                        },
                        _destroy: false
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        sumOrder: { $sum: '$sumOrder' },
                        order: { $first: '$$ROOT' },
                        productCount: { $sum: '$product.quantity' }
                    }
                },
                {
                    $sort: { 'sumOrder': -1 }
                },
                {
                    $limit: 10
                }
            ]).toArray()
            return {
                resultTotalOrder,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalTopProduct = async (role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const currentDate = new Date()
            currentDate.setDate(1)
            const now = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0')
            const resultTopProduct = await getDB().collection(collectionName).aggregate([
                {
                    $unwind: '$product'
                },
                {
                    $match: {
                        status: { $in: ['Delivery successful'] },
                        createDate: {
                            $gte: now.toString()
                        },
                        _destroy: false
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        order: { $first: '$$ROOT' },
                        productCount: { $sum: '$product.quantity' }
                    }
                },
                {
                    $sort: { productCount: -1 }
                },
                {
                    $limit: 10
                }
            ]).toArray()
            return {
                resultTopProduct,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalTopOrderAll = async (role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const resultTotalOrder = await getDB().collection(collectionName).aggregate([
                {
                    $unwind: '$product'
                },
                {
                    $match: {
                        status: { $in: ['Delivery successful'] },
                        _destroy: false
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        order: { $first: '$$ROOT' },
                        sumOrder: { $sum: '$sumOrder' },
                        productCount: { $sum: '$product.quantity' }
                    }
                },
                {
                    $sort: { 'sumOrder': -1 }
                },
                // {
                //     $replaceRoot: { newRoot: '$order' }
                // },
            ]).limit(10).toArray()
            return {
                resultTotalOrder,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalTopProductAll = async (role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const resultTopProduct = await getDB().collection(collectionName).aggregate([
                {
                    $unwind: '$product'
                },
                {
                    $match: {
                        status: { $in: ['Delivery successful'] },
                        _destroy: false
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        order: { $first: '$$ROOT' },
                        productCount: { $sum: '$product.quantity' }
                    }
                },
                {
                    $sort: { productCount: -1 }
                },
                {
                    $limit: 10
                }
            ]).toArray()
            return {
                resultTopProduct,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalOrdersByDay = async (role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const currentDate = new Date()
            const currentMonth = currentDate.getMonth()
            const currentYear = currentDate.getFullYear()
            const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
            const startDateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-01`
            const endDateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${lastDayOfMonth.getDate().toString().padStart(2, '0')}`
            const resultTotalOrder = await getDB().collection(collectionName).aggregate([
                {
                    $match: {
                        createDate: {
                            $gte: startDateString,
                            $lte: endDateString
                        },
                        _destroy: false
                    }
                },
                {
                    $facet: {
                        countOrdered: [
                            {
                                $match: {
                                    status: 'Ordered'
                                }
                            },
                            {
                                $group: {
                                    _id: '$createDate',
                                    countOrdered: { $sum: 1 },
                                    sumOrderOrdered: { $sum: '$sumOrder' }
                                }
                            }
                        ],
                        countProcessing: [
                            {
                                $match: {
                                    status: { $in: ['Being transported', 'Payment information confirmed', 'Delivered to the carrier'] }
                                }
                            },
                            {
                                $group: {
                                    _id: '$createDate',
                                    countProcessing: { $sum: 1 },
                                    sumOrderProcessing: { $sum: '$sumOrder' }
                                }
                            }
                        ],
                        countSuccessful: [
                            {
                                $match: {
                                    status: 'Delivery successful'
                                }
                            },
                            {
                                $group: {
                                    _id: '$createDate',
                                    countSuccessful: { $sum: 1 },
                                    sumOrderSuccessful: { $sum: '$sumOrder' }
                                }
                            }
                        ]
                    }
                },
                {
                    $sort: { '_id': 1 }
                }
            ]).toArray()
            return {
                resultTotalOrder,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

export const orderChartModel = {
    getTotalOrder,
    getTotalOrderSuccessful,
    getTotalOrderFailed,
    getTotalOrderByStatus,
    getTotalTopOrder,
    getTotalOrdersByDay,
    getTotalTopProduct,
    getTotalTopProductAll,
    getTotalTopOrderAll
}