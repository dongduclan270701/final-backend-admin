import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'
const orderName = 'order'

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(orderName).findOne({ _id: ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const findUserAndUpdateOrderList = async (email, data) => {
    try {
        const newData = {
            orderId: data.orderId,
            product: [
                {
                    img: data.product[0].img[0],
                    nameProduct: data.product[0].nameProduct,
                    src: data.product[0].src,
                    quantity: data.product[0].quantity,
                    nowPrice: data.product[0].nowPrice,
                    collection: data.product[0].collection
                }],
            shipping_process: data.shipping_process,
            status: data.status,
            sumOrder: data.sumOrder,
            ship: data.ship
        }
        const updateUser = await getDB().collection('users').findOneAndUpdate(
            { email: email },
            { $push: { orders: newData } },
            { returnDocument: 'after' }
        )
        return updateUser.value
    }
    catch (error) {
        throw new Error(error)
    }
}

const updateOrder = async (id, data, role) => {
    try {
        const updateData = {
            ...data,
            updateAt: Date.now(),
            updateBy: { name: role.username, role: role.role }
        }
        const { _id, ...newUpdateData } = updateData
        const updateOrder = await getDB().collection(orderName).findOneAndUpdate(
            { orderId: id },
            { $set: newUpdateData },
            { returnDocument: 'after' }
        )
        await getDB().collection('users').findOneAndUpdate(
            { 'orders.orderId': newUpdateData.orderId },
            { $set: { 'orders.$.status': newUpdateData.status } },
            { returnDocument: 'after' }
        )

        return updateOrder.value
    } catch (error) {
        throw new Error(error)
    }
}


const getFullOrder = async (data, role) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        const result = await getDB().collection(orderName).find().limit(perPage).skip((perPage * page) - perPage).toArray()
        const resultTotal = await getDB().collection(orderName).find().toArray()
        return { data: [...result], total: resultTotal.length, role: role.role, chartData: resultTotal }
    } catch (error) {
        throw new Error(error)
    }
}

const getFullOrderInformation = async (id) => {
    try {
        const result = await getDB().collection(orderName).aggregate([
            {
                $match: {
                    orderId: id,
                    _destroy: false
                }
            }
        ]).toArray()
        return result[0] || { message: 'Not found order' }
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchOrder = async (data) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        const result = await getDB().collection(orderName).aggregate([
            {
                $match: {
                    status: { $regex: new RegExp(`${data.status}`) },
                    orderId: { $regex: new RegExp(`${data.orderId.toLowerCase()}`) },
                    _destroy: false
                }
            },
            {
                $addFields: {
                    orderedShippingProcess: {
                        $filter: {
                            input: '$shipping_process',
                            cond: {
                                $and: [
                                    { $eq: ['$$this.content', 'Ordered'] },
                                    {
                                        $and: [
                                            { $gte: ['$$this.date', data.firstDate] },
                                            { $lte: ['$$this.date', data.endDate] }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            {
                $match: {
                    orderedShippingProcess: { $ne: [] }
                }
            },
            {
                $addFields: {
                    lastProcess: { $arrayElemAt: ['$orderedShippingProcess', -1] },
                    dateCount: { $toDate: { $arrayElemAt: ['$orderedShippingProcess.date', -1] } }
                }
            },
            {
                $sort: {
                    dateCount: data.sortDate === 'asc' ? 1 : -1,
                    'lastProcess.date': data.sortDate === 'asc' ? 1 : -1,
                    'lastProcess.time': data.sortDate === 'asc' ? 1 : -1
                }
            }
        ]).skip((perPage * page) - perPage).limit(perPage).toArray();

        const resultTotal = await getDB().collection(orderName).aggregate([
            {
                $match: {
                    status: { $regex: new RegExp(`${data.status}`) },
                    'shipping_process': {
                        $elemMatch: {
                            date: {
                                $gte: data.firstDate,
                                $lte: data.endDate
                            },
                            content: 'Ordered'
                        }
                    },
                    orderId: { $regex: new RegExp(`${data.orderId.toLowerCase()}`) },
                    _destroy: false
                }
            }
        ]).toArray()
        return { data: [...result], total: resultTotal.length }
    } catch (error) {
        throw new Error(error)
    }
}

const ratingOrder = async (id, data) => {
    try {
        if (data.statusOrder === 'Accept') {
            const updateOrder = await getDB().collection(orderName).findOneAndUpdate(
                { orderId: id },
                { $set: { statusReview: data } },
                { returnDocument: 'after' }
            )
            data.product.map(async (item, index) => {
                const updateProduct = await getDB().collection(item.collection).findOneAndUpdate(
                    { nameProduct: item.nameProduct },
                    { $push: { rating: { star: item.star, content: item.content, username: data.username, email: data.email, img: data.image, date: data.date, time: data.time } } },
                    { returnDocument: 'after' }
                )
                return updateProduct
            })
            return updateOrder.value
        }
        else {
            const updateOrder = await getDB().collection(orderName).findOneAndUpdate(
                { orderId: id },
                { $set: { statusReview: data } },
                { returnDocument: 'after' }
            )
            return updateOrder.value
        }

    } catch (error) {
        throw new Error(error)
    }
}
export const orderAdminModel = {
    findUserAndUpdateOrderList,
    getFullOrderInformation,
    getFullOrder,
    updateOrder,
    findOneById,
    getSearchOrder,
    ratingOrder
}