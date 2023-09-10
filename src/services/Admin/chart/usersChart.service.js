import { usersChartModel } from '*/models/Admin/chart/usersChart.model'
import { cloneDeep } from 'lodash'

const getTotalUsers = async (role) => {
    try {
        const usersChart = await usersChartModel.getTotalUsers(role)
        const transformUsersChart = cloneDeep(usersChart)
        return transformUsersChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalUserLoginLastMonth = async (role) => {
    try {
        const usersChart = await usersChartModel.getTotalUserLoginLastMonth(role)
        const transformUsersChart = cloneDeep(usersChart)
        return transformUsersChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalUserLoginOverMonth = async (role) => {
    try {
        const usersChart = await usersChartModel.getTotalUserLoginOverMonth(role)
        const transformUsersChart = cloneDeep(usersChart)
        return transformUsersChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalUserJoinInMonth = async (role) => {
    try {
        const usersChart = await usersChartModel.getTotalUserJoinInMonth(role)
        const transformUsersChart = cloneDeep(usersChart)
        return transformUsersChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalUserAddGoodsToWishlist = async (role) => {
    try {
        const usersChart = await usersChartModel.getTotalUserAddGoodsToWishlist(role)
        const transformUsersChart = cloneDeep(usersChart)
        return transformUsersChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalUserPurchased = async (role) => {
    try {
        const usersChart = await usersChartModel.getTotalUserPurchased(role)
        const transformUsersChart = cloneDeep(usersChart)
        return transformUsersChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalAgeUser = async (role) => {
    try {
        const usersChart = await usersChartModel.getTotalAgeUser(role)
        const transformUsersChart = cloneDeep(usersChart)
        return transformUsersChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalStatusUser = async (role) => {
    try {
        const usersChart = await usersChartModel.getTotalStatusUser(role)
        const transformUsersChart = cloneDeep(usersChart)
        return transformUsersChart
    } catch (error) {
        throw new Error(error)
    }
}

const getTopUserHighestValue = async (role) => {
    try {
        const usersChart = await usersChartModel.getTopUserHighestValue(role)
        const transformUsersChart = cloneDeep(usersChart)
        return transformUsersChart
    } catch (error) {
        throw new Error(error)
    }
}

export const usersChartService = { 
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