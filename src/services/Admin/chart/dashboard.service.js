import { dashboardModel } from '*/models/Admin/chart/dashboard.model'
import { cloneDeep } from 'lodash'

const getTopSoldProducts = async (data, role) => {
    try {
        const productChart = await dashboardModel.getTopSoldProducts(data, role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTopViewProducts = async (data, role) => {
    try {
        const productChart = await dashboardModel.getTopViewProducts(data, role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalOrderSuccessful = async (role) => {
    try {
        const productChart = await dashboardModel.getTotalOrderSuccessful(role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalOrder = async (role) => {
    try {
        const productChart = await dashboardModel.getTotalOrder(role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTopEmployeeHighestValueInYearNotLimit = async (role) => {
    try {
        const productChart = await dashboardModel.getTopEmployeeHighestValueInYearNotLimit(role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

export const dashboardService = { 
    getTopSoldProducts,
    getTopViewProducts,
    getTotalOrderSuccessful,
    getTotalOrder,
    getTopEmployeeHighestValueInYearNotLimit
}