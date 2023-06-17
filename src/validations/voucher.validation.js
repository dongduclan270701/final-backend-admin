import Joi from 'joi'
import { HttpStatusCode } from '*/utils/constants'

const createNewVoucher = async (req, res, next) => {
    const condition = Joi.object({
        discountId: Joi.string().required(),
        code: Joi.string().required(),
        discountName: Joi.string().required(),
        description: Joi.string().required(),
        dateCreated: Joi.string().required(),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        cost: Joi.number().required(),
        status: Joi.boolean().required(),
        usage: Joi.number()
    })
    try {
        await condition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            error: new Error(error).message
        })
    }
}

const update = async (req, res, next) => {
    const condition = Joi.object({
    })
    try {
        await condition.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
        next()
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            error: new Error(error).message
        })
    }
}

export const voucherValidation = { createNewVoucher, update }