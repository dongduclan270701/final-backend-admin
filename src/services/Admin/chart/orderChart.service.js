import { orderChartModel } from '*/models/Admin/chart/orderChart.model'
import { cloneDeep } from 'lodash'

const getTotalOrder = async (role) => {
    try {
        const orderChart = await orderChartModel.getTotalOrder(role)
        const transformOrderChart = cloneDeep(orderChart)
        return transformOrderChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalOrderSuccessful = async (role) => {
    try {
        const orderChart = await orderChartModel.getTotalOrderSuccessful(role)
        const transformOrderChart = cloneDeep(orderChart)
        return transformOrderChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalOrderFailed = async (role) => {
    try {
        const orderChart = await orderChartModel.getTotalOrderFailed(role)
        const transformOrderChart = cloneDeep(orderChart)
        return transformOrderChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalOrderByStatus = async (role) => {
    try {
        const orderChart = await orderChartModel.getTotalOrderByStatus(role)
        const transformOrderChart = cloneDeep(orderChart)
        return transformOrderChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalTopOrder = async (role) => {
    try {
        const orderChart = await orderChartModel.getTotalTopOrder(role)
        const transformOrderChart = cloneDeep(orderChart)
        return transformOrderChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalOrdersByDay = async (role) => {
    try {
        const orderChart = await orderChartModel.getTotalOrdersByDay(role)
        const transformOrderChart = cloneDeep(orderChart)
        return transformOrderChart
    } catch (error) {
        throw new Error(error)
    }
}

export const orderChartService = { 
    getTotalOrder,
    getTotalOrderSuccessful,
    getTotalOrderFailed,
    getTotalOrderByStatus,
    getTotalTopOrder,
    getTotalOrdersByDay
}