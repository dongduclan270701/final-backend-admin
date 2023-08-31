import { laptopCollectingService } from '*/services/Admin/laptopCollecting.service'
import { HttpStatusCode } from '*/utils/constants'

const createNew = async (req, res) => {
    try {
        const data = req.body
        const result = await laptopCollectingService.createNew(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullLaptopCollecting = async (req, res) => {
    try {
        const data = req.query
        const result = await laptopCollectingService.getFullLaptopCollecting(data, req.result)
        
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalGoods = async (req, res) => {
    try {
        const result = await laptopCollectingService.getTotalGoods(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalOutOfStock = async (req, res) => {
    try {
        const result = await laptopCollectingService.getTotalOutOfStock(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalSoldAndProfitOfMonth = async (req, res) => {
    try {
        const result = await laptopCollectingService.getTotalSoldAndProfitOfMonth(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalViewInMonth = async (req, res) => {
    try {
        const result = await laptopCollectingService.getTotalViewInMonth(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalSoldInYear = async (req, res) => {
    try {
        const result = await laptopCollectingService.getTotalSoldInYear(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalViewInYear = async (req, res) => {
    try {
        const result = await laptopCollectingService.getTotalViewInYear(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalSoldByDay = async (req, res) => {
    try {
        const result = await laptopCollectingService.getTotalSoldByDay(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalViewByDay = async (req, res) => {
    try {
        const result = await laptopCollectingService.getTotalViewByDay(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalAInStock = async (req, res) => {
    try {
        const result = await laptopCollectingService.getTotalAInStock(req.result)
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
        const result = await laptopCollectingService.getCountGoodsByCategory(data, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTopSoldProducts = async (req, res) => {
    try {
        const result = await laptopCollectingService.getTopSoldProducts(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTopViewProducts = async (req, res) => {
    try {
        const result = await laptopCollectingService.getTopViewProducts(req.result)
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
        const result = await laptopCollectingService.getSoldProductsByCategory(data, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullLaptopInformationAdmin = async (req, res) => {
    try {
        const { id } = req.params
        const result = await laptopCollectingService.getFullLaptopInformationAdmin(id)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getSearchLaptopInformation = async (req, res) => {
    try {
        const data = req.query
        const result = await laptopCollectingService.getSearchLaptopInformation(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const { src } = req.params
        const result = await laptopCollectingService.update(src, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const laptopCollectingController = { 
    createNew, 
    getSearchLaptopInformation, 
    getFullLaptopInformationAdmin, 
    getFullLaptopCollecting, 
    update,
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