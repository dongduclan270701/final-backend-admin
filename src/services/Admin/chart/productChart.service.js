import { productChartModel } from '*/models/Admin/chart/productChart.model'
import { cloneDeep } from 'lodash'

const getTotalGoods = async (data, role) => {
    try {
        const productChart = await productChartModel.getTotalGoods(data, role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalOutOfStock = async (data, role) => {
    try {
        const productChart = await productChartModel.getTotalOutOfStock(data, role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalAInStock = async (data, role) => {
    try {
        const productChart = await productChartModel.getTotalAInStock(data, role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalSoldAndProfitOfMonth = async (data, role) => {
    try {
        const productChart = await productChartModel.getTotalSoldAndProfitOfMonth(data, role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalViewInMonth = async (data, role) => {
    try {
        const productChart = await productChartModel.getTotalViewInMonth(data, role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalViewInYear = async (data, role) => {
    try {
        const productChart = await productChartModel.getTotalViewInYear(data, role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalSoldInYear = async (data, role) => {
    try {
        const productChart = await productChartModel.getTotalSoldInYear(data, role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalSoldByDay = async (data, role) => {
    try {
        const productChart = await productChartModel.getTotalSoldByDay(data, role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalViewByDay = async (data, role) => {
    try {
        const productChart = await productChartModel.getTotalViewByDay(data, role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getCountGoodsByCategory = async (data, role) => {
    try {
        const productChart = await productChartModel.getCountGoodsByCategory(data, role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getSoldProductsByCategory = async (data, role) => {
    try {
        const productChart = await productChartModel.getSoldProductsByCategory(data, role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTopSoldProducts = async (data, role) => {
    try {
        const productChart = await productChartModel.getTopSoldProducts(data, role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTopViewProducts = async (data, role) => {
    try {
        const productChart = await productChartModel.getTopViewProducts(data, role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

export const productChartService = { 
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