import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'

// Define Board collection
const voucherName = 'voucher'
const voucherSchema = Joi.object({
    discountId: Joi.string().required(),
    code: Joi.string().required(),
    discountName: Joi.string().required(),
    description: Joi.string().required(),
    createAt: Joi.date().timestamp().default(Date.now()),
    createdBy: Joi.object().default({}),
    updatedBy: Joi.array().items(Joi.object()).default([]),
    dateCreated: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    cost: Joi.number().required(),
    status: Joi.boolean().required(),
    usage: Joi.number().default(0),
    memberUsed: Joi.object().default({}),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await voucherSchema.validateAsync(data, { abortEarly: false }) // Hiển thị đầy đủ lỗi nếu trong trường data có 2 field trở lên bị lỗi
}

const createNewVoucher = async (data, role) => {
    try {
        const newData = {
            ...data,
            createdBy: {
                username: role.username,
                email: role.email,
                role: role.role
            }
        }
        const value = await validateSchema(newData)
        const dataFindDiscountId = await getDB().collection(voucherName).aggregate([
            {
                $match: {
                    discountId: value.discountId,
                    _destroy: false
                }
            }
        ]).toArray()
        const dataFindCode = await getDB().collection(voucherName).aggregate([
            {
                $match: {
                    code: value.code,
                    _destroy: false
                }
            }
        ]).toArray()
        if (dataFindDiscountId.length > 0) {
            return { message: 'Discount code already exists' }
        } else if (dataFindCode.length > 0) {
            return { message: 'Discount code already exists' }
        } else {
            const result = await getDB().collection(voucherName).insertOne(value)
            return result
        }
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(voucherName).findOne({ _id: ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const updateVoucher = async (id, data, role) => {
    try {
        const updateData = {
            ...data,
            updatedBy: [
                ...data.updatedBy,
                {
                    role: role.role,
                    username: role.username,
                    email: role.email,
                    reasonUpdate: data.reasonUpdate
                }
            ]
        }
        
        const { reasonUpdate, _id, ...newUpdateData } = updateData
        const updateUser = await getDB().collection(voucherName).findOneAndUpdate(
            { discountId: id },
            { $set: newUpdateData },
            { returnDocument: 'after' }
        )
        return updateUser.value
    } catch (error) {
        throw new Error(error)
    }
}


const getFullVoucher = async (data, role) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        const result = await getDB().collection(voucherName).find().limit(perPage).skip((perPage * page) - perPage).toArray()
        const resultTotal = await getDB().collection(voucherName).find().toArray()
        return { data: [...result], total: resultTotal.length, role: role.role }
    } catch (error) {
        throw new Error(error)
    }
}

const getVoucherInformation = async (id, role) => {
    try {
        const result = await getDB().collection(voucherName).aggregate([
            {
                $match: {
                    discountId: id,
                    _destroy: false
                }
            }
        ]).toArray()
        return result[0] || { message: 'Not found voucher' }
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchVoucher = async (data) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)

        let status = data.status
        if (status === '') {
            status = { $in: [true, false] }
        } else {
            status = status === 'Active' ? true : false
        }
        const result = await getDB().collection(voucherName).aggregate([
            {
                $match: {
                    code: { $regex: new RegExp(data.code, 'i') },
                    status: status,
                    _destroy: false
                }
            }
        ]).skip((perPage * page) - perPage).limit(perPage).toArray()
        const resultTotal = await getDB().collection(voucherName).aggregate([
            {
                $match: {
                    code: { $regex: new RegExp(data.code, 'i') },
                    status: status,
                    _destroy: false
                }
            }
        ]).toArray()
        return { data: [...result], total: resultTotal.length }

    } catch (error) {
        throw new Error(error)
    }
}
export const voucherAdminModel = {
    createNewVoucher,
    getVoucherInformation,
    getFullVoucher,
    updateVoucher,
    findOneById,
    getSearchVoucher
}