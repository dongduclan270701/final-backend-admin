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

export const employeeChartController = { 
    getTotalEmployee,
    getTotalEmployeeWorking,
    getTotalAgeEmployee
}