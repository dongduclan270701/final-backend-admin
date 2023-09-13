import { dashboardService } from '*/services/Admin/chart/dashboard.service'
import { HttpStatusCode } from '*/utils/constants'

const getTopSoldProducts = async (req, res) => {
    try {
        const data = req.query
        const result = await dashboardService.getTopSoldProducts(data, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTopViewProducts = async (req, res) => {
    try {
        const data = req.query
        const result = await dashboardService.getTopViewProducts(data, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalOrder = async (req, res) => {
    try {
        const result = await dashboardService.getTotalOrder(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalOrderSuccessful = async (req, res) => {
    try {
        const result = await dashboardService.getTotalOrderSuccessful(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTopEmployeeHighestValueInYearNotLimit = async (req, res) => {
    try {
        const result = await dashboardService.getTopEmployeeHighestValueInYearNotLimit(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const dashboardController = { 
    getTopSoldProducts,
    getTopViewProducts,
    getTotalOrder,
    getTotalOrderSuccessful,
    getTopEmployeeHighestValueInYearNotLimit
}