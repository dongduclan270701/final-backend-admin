import { usersChartService } from '*/services/Admin/chart/usersChart.service'
import { HttpStatusCode } from '*/utils/constants'

const getTotalUsers = async (req, res) => {
    try {
        const result = await usersChartService.getTotalUsers(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalUserLoginLastMonth = async (req, res) => {
    try {
        const result = await usersChartService.getTotalUserLoginLastMonth(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalUserLoginOverMonth = async (req, res) => {
    try {
        const result = await usersChartService.getTotalUserLoginOverMonth(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalUserAddGoodsToWishlist = async (req, res) => {
    try {
        const result = await usersChartService.getTotalUserAddGoodsToWishlist(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalUserPurchased = async (req, res) => {
    try {
        const result = await usersChartService.getTotalUserPurchased(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalUserJoinInMonth = async (req, res) => {
    try {
        const result = await usersChartService.getTotalUserJoinInMonth(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalAgeUser = async (req, res) => {
    try {
        const result = await usersChartService.getTotalAgeUser(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalStatusUser = async (req, res) => {
    try {
        const result = await usersChartService.getTotalStatusUser(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTopUserHighestValue = async (req, res) => {
    try {
        const result = await usersChartService.getTopUserHighestValue(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const usersChartController = { 
    getTotalUsers,
    getTotalUserLoginLastMonth,
    getTotalUserLoginOverMonth,
    getTotalUserAddGoodsToWishlist,
    getTotalUserPurchased,
    getTotalUserJoinInMonth,
    getTotalAgeUser,
    getTotalStatusUser,
    getTopUserHighestValue
}