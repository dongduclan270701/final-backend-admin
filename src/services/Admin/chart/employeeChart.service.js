import { employeeChartModel } from '*/models/Admin/chart/employeeChart.model'
import { cloneDeep } from 'lodash'

const getTotalEmployee = async (role) => {
    try {
        const employeeChart = await employeeChartModel.getTotalEmployee(role)
        const transformEmployeeChart = cloneDeep(employeeChart)
        return transformEmployeeChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalEmployeeWorking = async (role) => {
    try {
        const employeeChart = await employeeChartModel.getTotalEmployeeWorking(role)
        const transformEmployeeChart = cloneDeep(employeeChart)
        return transformEmployeeChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalAgeEmployee = async (role) => {
    try {
        const employeeChart = await employeeChartModel.getTotalAgeEmployee(role)
        const transformEmployeeChart = cloneDeep(employeeChart)
        return transformEmployeeChart
    } catch (error) {
        throw new Error(error)
    }
}

export const employeeChartService = { 
    getTotalEmployee,
    getTotalEmployeeWorking,
    getTotalAgeEmployee
}