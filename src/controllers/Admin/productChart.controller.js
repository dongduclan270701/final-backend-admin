import { productChartService } from '*/services/Admin/productChart.service'
import { HttpStatusCode } from '*/utils/constants'

const getTotalGoods = async (req, res) => {
    try {
        const result = await productChartService.getTotalGoods(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalOutOfStock = async (req, res) => {
    try {
        const result = await productChartService.getTotalOutOfStock(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalSoldAndProfitOfMonth = async (req, res) => {
    try {
        const result = await productChartService.getTotalSoldAndProfitOfMonth(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalViewInMonth = async (req, res) => {
    try {
        const result = await productChartService.getTotalViewInMonth(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalSoldInYear = async (req, res) => {
    try {
        const result = await productChartService.getTotalSoldInYear(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalViewInYear = async (req, res) => {
    try {
        const result = await productChartService.getTotalViewInYear(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalSoldByDay = async (req, res) => {
    try {
        const result = await productChartService.getTotalSoldByDay(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalViewByDay = async (req, res) => {
    try {
        const result = await productChartService.getTotalViewByDay(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalAInStock = async (req, res) => {
    try {
        const result = await productChartService.getTotalAInStock(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getCountGoodsByCategory = async (req, res) => {
    try {
        const data = req.query
        const result = await productChartService.getCountGoodsByCategory(data, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTopSoldProducts = async (req, res) => {
    try {
        const result = await productChartService.getTopSoldProducts(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTopViewProducts = async (req, res) => {
    try {
        const result = await productChartService.getTopViewProducts(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getSoldProductsByCategory = async (req, res) => {
    try {
        const data = req.query
        const result = await productChartService.getSoldProductsByCategory(data, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const productChartController = { 
    getTotalGoods,
    getTotalOutOfStock,
    getTotalAInStock,
    getTotalSoldAndProfitOfMonth,
    getTotalViewInMonth,
    getTotalSoldInYear,
    getTotalViewInYear,
    getTotalSoldByDay,
    getTotalViewByDay,
    getCountGoodsByCategory,
    getSoldProductsByCategory,
    getTopSoldProducts,
    getTopViewProducts
}