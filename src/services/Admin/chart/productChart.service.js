import { productChartModel } from '*/models/Admin/chart/productChart.model'
import { cloneDeep } from 'lodash'

const getTotalGoods = async (role) => {
    try {
        const productChart = await productChartModel.getTotalGoods(role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalOutOfStock = async (role) => {
    try {
        const productChart = await productChartModel.getTotalOutOfStock(role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalAInStock = async (role) => {
    try {
        const productChart = await productChartModel.getTotalAInStock(role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalSoldAndProfitOfMonth = async (role) => {
    try {
        const productChart = await productChartModel.getTotalSoldAndProfitOfMonth(role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalViewInMonth = async (role) => {
    try {
        const productChart = await productChartModel.getTotalViewInMonth(role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalViewInYear = async (role) => {
    try {
        const productChart = await productChartModel.getTotalViewInYear(role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalSoldInYear = async (role) => {
    try {
        const productChart = await productChartModel.getTotalSoldInYear(role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalSoldByDay = async (role) => {
    try {
        const productChart = await productChartModel.getTotalSoldByDay(role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalViewByDay = async (role) => {
    try {
        const productChart = await productChartModel.getTotalViewByDay(role)
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

const getTopSoldProducts = async (role) => {
    try {
        const productChart = await productChartModel.getTopSoldProducts(role)
        const transformProductChart = cloneDeep(productChart)
        return transformProductChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTopViewProducts = async (role) => {
    try {
        const productChart = await productChartModel.getTopViewProducts(role)
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