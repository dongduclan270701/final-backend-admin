import { getDB } from '*/config/mongodb.js'

// Define Board collection
const collectionName = 'admin'

const getTotalEmployee = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotalEmployee
            ] = await Promise.all([
                getDB().collection(collectionName).find().toArray()
            ])
            return {
                total: resultTotalEmployee.length,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalEmployeeWorking = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotalEmployeeWorking
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            status: true,
                            _destroy: false
                        }
                    }
                ]).toArray()
            ])
            return {
                total: resultTotalEmployeeWorking.length,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalAgeEmployee = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotalAgeEmployeeWorking,
                resultTotalAgeEmployeeHasRetired
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            status: true,
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
                            working: { $sum: 1 }
                        }
                    },
                    {
                        $sort: {
                            '_id': 1
                        }
                    }
                ]).toArray(),
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            status: false,
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
                            tired: { $sum: 1 }
                        }
                    },
                    {
                        $sort: {
                            '_id': 1
                        }
                    }
                ]).toArray()
            ])
            const uniqueIds = [...new Set([...resultTotalAgeEmployeeWorking.map(doc => doc._id), ...resultTotalAgeEmployeeHasRetired.map(doc => doc._id)])]
            const mergedResult = uniqueIds.map(id => ({
                _id: id,
                working: resultTotalAgeEmployeeWorking.find(doc => doc._id === id)?.working || 0,
                tired: resultTotalAgeEmployeeHasRetired.find(doc => doc._id === id)?.tired || 0
            }))
            return {
                totalAgeEmployee: mergedResult,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalRole = async (role) => {
    try {
        if (role.role === 'CEO') {
            const result = await getDB().collection(collectionName).aggregate([
                {
                    $match: {
                        role: { $in: ['CEO', 'SALES', 'PRODUCT', 'ORDER', 'MANAGEMENT'] },
                        _destroy: false
                    }
                },
                {
                    $group: {
                        _id: '$role',
                        total: { $sum: 1 }
                    }
                }
            ]).toArray()
            const totalCEO = result.find(item => item._id === 'CEO')?.total || 0
            const totalSALES = result.find(item => item._id === 'SALES')?.total || 0
            const totalPRODUCT = result.find(item => item._id === 'PRODUCT')?.total || 0
            const totalORDER = result.find(item => item._id === 'ORDER')?.total || 0
            const totalMANAGEMENT = result.find(item => item._id === 'MANAGEMENT')?.total || 0
            return {
                totalCEO,
                totalSALES,
                totalPRODUCT,
                totalORDER,
                totalMANAGEMENT
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalSoldInMonth = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotal
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            role: 'SALES',
                            _destroy: false
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            totalSoldProductInMonth: {
                                $sum: '$soldProductInMonth.soldProduct'
                            },
                            totalSoldProductInYear: {
                                $sum: '$soldProductInYear.soldProduct'
                            }
                        }
                    }
                ]).toArray()
            ])
            return {
                resultTotal
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalOrderInMonth = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotal
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            role: 'SALES',
                            _destroy: false
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            totalOrderInMonth: {
                                $sum: '$soldOrderInMonth.order'
                            },
                            totalOrderInYear: {
                                $sum: '$soldOrderInYear.order'
                            }
                        }
                    }
                ]).toArray()
            ])
            return {
                resultTotal
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalChartSoldInMonth = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotal
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            role: 'SALES',
                            _destroy: false
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            soldProductInMonth: '$soldProductInMonth',
                            target: '$kpiInMonth',
                            salary: '$salary'
                        }
                    }
                ]).toArray()
            ])
            return {
                resultTotal
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalChartOrderInMonth = async (role) => {
    try {
        if (role.role === 'CEO') {
            const [
                resultTotal
            ] = await Promise.all([
                getDB().collection(collectionName).aggregate([
                    {
                        $match: {
                            role: 'SALES',
                            _destroy: false
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            soldOrderInMonth: '$soldOrderInMonth'
                        }
                    }
                ]).toArray()
            ])
            return {
                resultTotal
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTopEmployeeHighestValue = async (role) => {
    try {
        if (role.role === 'CEO') {
            const limit = 10
            const aggregationResult = await getDB().collection(collectionName).aggregate([
                {
                    $match: {
                        role: 'SALES',
                        _destroy: false
                    }
                },
                {
                    $project: {
                        _id: 0,
                        username: 1,
                        role: 1,
                        status: 1,
                        image:1,
                        totalProduct: { $sum: '$soldProductInMonth.soldProduct' },
                        totalAmount: { $sum: '$soldProductInMonth.amount' }
                    }
                },
                {
                    $sort: { totalProduct: -1 }
                },
                {
                    $limit: limit
                }
            ]).toArray()
            return {
                topEmployeeHighestValue: aggregationResult,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTopEmployeeHighestOrder = async (role) => {
    try {
        if (role.role === 'CEO') {
            const limit = 10
            const aggregationResult = await getDB().collection(collectionName).aggregate([
                {
                    $match: {
                        role: 'SALES',
                        _destroy: false
                    }
                },
                {
                    $project: {
                        _id: 0,
                        username: 1,
                        role: 1,
                        status: 1,
                        image:1,
                        totalOrder: { $sum: '$soldOrderInMonth.order' },
                        totalAmount: { $sum: '$soldOrderInMonth.amount' }
                    }
                },
                {
                    $sort: { totalOrder: -1 }
                },
                {
                    $limit: limit
                }
            ]).toArray()
            return {
                topEmployeeHighestOrder: aggregationResult,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTopEmployeeHighestValueInYear = async (role) => {
    try {
        if (role.role === 'CEO') {
            const limit = 10
            const aggregationResult = await getDB().collection(collectionName).aggregate([
                {
                    $match: {
                        role: 'SALES',
                        _destroy: false
                    }
                },
                {
                    $project: {
                        _id: 0,
                        username: 1,
                        role: 1,
                        status: 1,
                        image:1,
                        totalProduct: { $sum: '$soldProductInYear.soldProduct' },
                        totalAmount: { $sum: '$soldProductInYear.amount' }
                    }
                },
                {
                    $sort: { totalAmount: -1 }
                },
                {
                    $limit: limit
                }
            ]).toArray()
            return {
                topEmployeeHighestValue: aggregationResult,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
const getTopEmployeeHighestOrderInYear = async (role) => {
    try {
        if (role.role === 'CEO') {
            const limit = 10
            const aggregationResult = await getDB().collection(collectionName).aggregate([
                {
                    $match: {
                        role: 'SALES',
                        _destroy: false
                    }
                },
                {
                    $project: {
                        _id: 0,
                        username: 1,
                        role: 1,
                        status: 1,
                        image:1,
                        totalOrder: { $sum: '$soldOrderInYear.order' },
                        totalAmount: { $sum: '$soldOrderInYear.amount' }
                    }
                },
                {
                    $sort: { totalOrder: -1 }
                },
                {
                    $limit: limit
                }
            ]).toArray()
            return {
                topEmployeeHighestOrder: aggregationResult,
                role: role.role
            }
        } else {
            return 0
        }
    } catch (error) {
        throw new Error(error)
    }
}
export const employeeChartModel = {
    getTotalEmployee,
    getTotalEmployeeWorking,
    getTotalAgeEmployee,
    getTotalRole,
    getTotalSoldInMonth,
    getTotalChartSoldInMonth,
    getTopEmployeeHighestValue,
    getTotalOrderInMonth,
    getTotalChartOrderInMonth,
    getTopEmployeeHighestValueInYear,
    getTopEmployeeHighestOrderInYear,
    getTopEmployeeHighestOrder
}