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

const getTotalRole = async (role) => {
    try {
        const employeeChart = await employeeChartModel.getTotalRole(role)
        const transformEmployeeChart = cloneDeep(employeeChart)
        return transformEmployeeChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalSoldInMonth = async (role) => {
    try {
        const employeeChart = await employeeChartModel.getTotalSoldInMonth(role)
        const transformEmployeeChart = cloneDeep(employeeChart)
        return transformEmployeeChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalChartSoldInMonth = async (role) => {
    try {
        const employeeChart = await employeeChartModel.getTotalChartSoldInMonth(role)
        const transformEmployeeChart = cloneDeep(employeeChart)
        return transformEmployeeChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTopEmployeeHighestValue = async (role) => {
    try {
        const employeeChart = await employeeChartModel.getTopEmployeeHighestValue(role)
        const transformEmployeeChart = cloneDeep(employeeChart)
        return transformEmployeeChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalOrderInMonth = async (role) => {
    try {
        const employeeChart = await employeeChartModel.getTotalOrderInMonth(role)
        const transformEmployeeChart = cloneDeep(employeeChart)
        return transformEmployeeChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalChartOrderInMonth = async (role) => {
    try {
        const employeeChart = await employeeChartModel.getTotalChartOrderInMonth(role)
        const transformEmployeeChart = cloneDeep(employeeChart)
        return transformEmployeeChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTopEmployeeHighestValueInYear = async (role) => {
    try {
        const employeeChart = await employeeChartModel.getTopEmployeeHighestValueInYear(role)
        const transformEmployeeChart = cloneDeep(employeeChart)
        return transformEmployeeChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTopEmployeeHighestOrderInYear = async (role) => {
    try {
        const employeeChart = await employeeChartModel.getTopEmployeeHighestOrderInYear(role)
        const transformEmployeeChart = cloneDeep(employeeChart)
        return transformEmployeeChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTopEmployeeHighestOrder = async (role) => {
    try {
        const employeeChart = await employeeChartModel.getTopEmployeeHighestOrder(role)
        const transformEmployeeChart = cloneDeep(employeeChart)
        return transformEmployeeChart
    } catch (error) {
        throw new Error(error)
    }
}

export const employeeChartService = { 
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