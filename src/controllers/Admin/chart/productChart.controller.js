import { productChartService } from '*/services/Admin/chart/productChart.service'
import { HttpStatusCode } from '*/utils/constants'

const getTotalGoods = async (req, res) => {
    try {
        const data = req.query
        const result = await productChartService.getTotalGoods(data, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalOutOfStock = async (req, res) => {
    try {
        const data = req.query
        const result = await productChartService.getTotalOutOfStock(data, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalSoldAndProfitOfMonth = async (req, res) => {
    try {
        const data = req.query
        const result = await productChartService.getTotalSoldAndProfitOfMonth(data, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalViewInMonth = async (req, res) => {
    try {
        const data = req.query
        const result = await productChartService.getTotalViewInMonth(data, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalSoldInYear = async (req, res) => {
    try {
        const data = req.query
        const result = await productChartService.getTotalSoldInYear(data, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalViewInYear = async (req, res) => {
    try {
        const data = req.query
        const result = await productChartService.getTotalViewInYear(data, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalSoldByDay = async (req, res) => {
    try {
        const data = req.query
        const result = await productChartService.getTotalSoldByDay(data, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalViewByDay = async (req, res) => {
    try {
        const data = req.query
        const result = await productChartService.getTotalViewByDay(data, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalAInStock = async (req, res) => {
    try {
        const data = req.query
        const result = await productChartService.getTotalAInStock(data, req.result)
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
        const data = req.query
        const result = await productChartService.getTopSoldProducts(data, req.result)
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
        const result = await productChartService.getTopViewProducts(data, req.result)
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