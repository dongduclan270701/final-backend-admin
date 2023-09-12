import { employeeChartService } from '*/services/Admin/chart/employeeChart.service'
import { HttpStatusCode } from '*/utils/constants'

const getTotalEmployee = async (req, res) => {
    try {
        const result = await employeeChartService.getTotalEmployee(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalEmployeeWorking = async (req, res) => {
    try {
        const result = await employeeChartService.getTotalEmployeeWorking(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalAgeEmployee = async (req, res) => {
    try {
        const result = await employeeChartService.getTotalAgeEmployee(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalRole = async (req, res) => {
    try {
        const result = await employeeChartService.getTotalRole(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalSoldInMonth = async (req, res) => {
    try {
        const result = await employeeChartService.getTotalSoldInMonth(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalChartSoldInMonth = async (req, res) => {
    try {
        const result = await employeeChartService.getTotalChartSoldInMonth(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTopEmployeeHighestValue = async (req, res) => {
    try {
        const result = await employeeChartService.getTopEmployeeHighestValue(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalOrderInMonth = async (req, res) => {
    try {
        const result = await employeeChartService.getTotalOrderInMonth(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTotalChartOrderInMonth = async (req, res) => {
    try {
        const result = await employeeChartService.getTotalChartOrderInMonth(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTopEmployeeHighestValueInYear = async (req, res) => {
    try {
        const result = await employeeChartService.getTopEmployeeHighestValueInYear(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTopEmployeeHighestOrderInYear = async (req, res) => {
    try {
        const result = await employeeChartService.getTopEmployeeHighestOrderInYear(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getTopEmployeeHighestOrder = async (req, res) => {
    try {
        const result = await employeeChartService.getTopEmployeeHighestOrder(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const employeeChartController = { 
    getTotalEmployee,
    getTotalEmployeeWorking,
    getTotalAgeEmployee,
    getTotalRole,
    getTotalSoldInMonth,
    getTotalChartSoldInMonth,
    getTopEmployeeHighestValue,
    getTotalOrderInMonth,
    getTotalChartOrderInMonth,
    getTopEmployeeHighestValueInYear,
    getTopEmployeeHighestOrderInYear,
    getTopEmployeeHighestOrder
}