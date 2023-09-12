import { orderChartService } from '*/services/Admin/chart/orderChart.service'
import { HttpStatusCode } from '*/utils/constants'

const getTotalOrder = async (req, res) => {
    try {
        const result = await orderChartService.getTotalOrder(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalOrderSuccessful = async (req, res) => {
    try {
        const result = await orderChartService.getTotalOrderSuccessful(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalOrderFailed = async (req, res) => {
    try {
        const result = await orderChartService.getTotalOrderFailed(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalOrderByStatus = async (req, res) => {
    try {
        const result = await orderChartService.getTotalOrderByStatus(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalTopOrder = async (req, res) => {
    try {
        const result = await orderChartService.getTotalTopOrder(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalOrdersByDay = async (req, res) => {
    try {
        const result = await orderChartService.getTotalOrdersByDay(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalTopProduct = async (req, res) => {
    try {
        const result = await orderChartService.getTotalTopProduct(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const orderChartController = { 
    getTotalOrder,
    getTotalOrderSuccessful,
    getTotalOrderFailed,
    getTotalOrderByStatus,
    getTotalTopOrder,
    getTotalOrdersByDay,
    getTotalTopProduct
}