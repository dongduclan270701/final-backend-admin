import { getDB } from '*/config/mongodb.js'

// Define Board collection
const collectionName = 'laptop'

const getTopSoldProducts = async (data, role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const limit = 10
            const aggregationResult = await getDB().collection(data.category).aggregate([
                {
                    $project: {
                        _id: 0,
                        nameProduct: 1,
                        src: 1,
                        category: 1,
                        collection: 1,
                        img: 1,
                        nowPrice: 1,
                        quantity: 1,
                        totalSold: { $sum: '$showInYear.sold' }
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
const getTopViewProducts = async (data, role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const limit = 10
            const aggregationResult = await getDB().collection(data.category).aggregate([
                {
                    $project: {
                        _id: 0,
                        nameProduct: 1,
                        src: 1,
                        collection: 1,
                        img: 1,
                        category: 1,
                        nowPrice: 1,
                        quantity: 1,
                        totalView: { $sum: '$viewInYear.view' }
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
const getTotalOrder = async (role) => {
    try {
        const today = new Date()
        const currentYear = today.getFullYear();
        const firstDayOfYear = new Date(currentYear, 0, 1)
        const lastDayOfYear = new Date(currentYear, 11, 32)
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const [
                resultTotalOrder
            ] = await Promise.all([
                getDB().collection('order').aggregate([
                    {
                        $match: {
                            status: { $in: ['Delivery successful'] },
                            'createDate': {
                                // $gte: now.toString()
                                $gte: firstDayOfYear.toISOString().slice(0, 10),
                                $lte: lastDayOfYear.toISOString().slice(0, 10)
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
                getDB().collection('order').aggregate([
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
const getTopEmployeeHighestValueInYearNotLimit = async (role) => {
    try {
        if (role.role === 'CEO' || role.role === 'MANAGEMENT') {
            const aggregationResult = await getDB().collection('admin').aggregate([
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
                        image: 1,
                        totalProduct: { $sum: '$soldProductInYear.soldProduct' },
                        totalAmount: { $sum: '$soldProductInYear.amount' }
                    }
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
export const dashboardModel = {
    getTopSoldProducts,
    getTopViewProducts,
    getTotalOrder,
    getTotalOrderSuccessful,
    getTopEmployeeHighestValueInYearNotLimit
}