import { orderAdminService } from '*/services/Admin/orderAdmin.service'
import { HttpStatusCode } from '*/utils/constants'

const getFullOrder = async (req, res) => {
    try {
        const data = req.query
        const result = await orderAdminService.getFullOrder(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullOrderInformation = async (req, res) => {
    try {
        const { id } = req.params
        const result = await orderAdminService.getFullOrderInformation(id)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getSearchOrder = async (req, res) => {
    try {
        const data = req.query
        const result = await orderAdminService.getSearchOrder(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params
        const result = await orderAdminService.updateOrder(id, req.body, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message00
        })
    }
}

const ratingOrder = async (req, res) => {
    try {
        const { id } = req.params
        const result = await orderAdminService.ratingOrder(id, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const orderAdminController = { 
    getSearchOrder, 
    getFullOrderInformation, 
    getFullOrder, 
    updateOrder,
    ratingOrder
}