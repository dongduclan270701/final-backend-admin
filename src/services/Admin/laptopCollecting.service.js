import { laptopCollectingModel } from '*/models/Admin/laptopCollecting.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
    try {
        const newLaptopCollecting = await laptopCollectingModel.createNew(data)
        const getNewLaptopCollecting = await laptopCollectingModel.findOneById(newLaptopCollecting.insertedId.toString())
        return getNewLaptopCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getFullLaptopCollecting = async (data, role) => {
    try {
        const laptopCollecting = await laptopCollectingModel.getFullLaptopCollecting(data, role)
        const transformLaptopCollecting = cloneDeep(laptopCollecting)
        return transformLaptopCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalGoods = async (role) => {
    try {
        const laptopCollecting = await laptopCollectingModel.getTotalGoods(role)
        const transformLaptopCollecting = cloneDeep(laptopCollecting)
        return transformLaptopCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalOutOfStock = async (role) => {
    try {
        const laptopCollecting = await laptopCollectingModel.getTotalOutOfStock(role)
        const transformLaptopCollecting = cloneDeep(laptopCollecting)
        return transformLaptopCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalAInStock = async (role) => {
    try {
        const laptopCollecting = await laptopCollectingModel.getTotalAInStock(role)
        const transformLaptopCollecting = cloneDeep(laptopCollecting)
        return transformLaptopCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalSoldAndProfitOfMonth = async (role) => {
    try {
        const laptopCollecting = await laptopCollectingModel.getTotalSoldAndProfitOfMonth(role)
        const transformLaptopCollecting = cloneDeep(laptopCollecting)
        return transformLaptopCollecting
    } catch (error) {
        throw new Error(error)
    }
}
const getTotalViewInMonth = async (role) => {
    try {
        const laptopCollecting = await laptopCollectingModel.getTotalViewInMonth(role)
        const transformLaptopCollecting = cloneDeep(laptopCollecting)
        return transformLaptopCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalViewInYear = async (role) => {
    try {
        const laptopCollecting = await laptopCollectingModel.getTotalViewInYear(role)
        const transformLaptopCollecting = cloneDeep(laptopCollecting)
        return transformLaptopCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalSoldInYear = async (role) => {
    try {
        const laptopCollecting = await laptopCollectingModel.getTotalSoldInYear(role)
        const transformLaptopCollecting = cloneDeep(laptopCollecting)
        return transformLaptopCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalSoldByDay = async (role) => {
    try {
        const laptopCollecting = await laptopCollectingModel.getTotalSoldByDay(role)
        const transformLaptopCollecting = cloneDeep(laptopCollecting)
        return transformLaptopCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getTotalViewByDay = async (role) => {
    try {
        const laptopCollecting = await laptopCollectingModel.getTotalViewByDay(role)
        const transformLaptopCollecting = cloneDeep(laptopCollecting)
        return transformLaptopCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getCountGoodsByCategory = async (data, role) => {
    try {
        const laptopCollecting = await laptopCollectingModel.getCountGoodsByCategory(data, role)
        const transformLaptopCollecting = cloneDeep(laptopCollecting)
        return transformLaptopCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getSoldProductsByCategory = async (data, role) => {
    try {
        const laptopCollecting = await laptopCollectingModel.getSoldProductsByCategory(data, role)
        const transformLaptopCollecting = cloneDeep(laptopCollecting)
        return transformLaptopCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getTopSoldProducts = async (role) => {
    try {
        const laptopCollecting = await laptopCollectingModel.getTopSoldProducts(role)
        const transformLaptopCollecting = cloneDeep(laptopCollecting)
        return transformLaptopCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getTopViewProducts = async (role) => {
    try {
        const laptopCollecting = await laptopCollectingModel.getTopViewProducts(role)
        const transformLaptopCollecting = cloneDeep(laptopCollecting)
        return transformLaptopCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchLaptopInformation = async (data) => {
    try {
        const laptopCollecting = await laptopCollectingModel.getSearchLaptopInformation(data)
        const transformLaptopCollecting = cloneDeep(laptopCollecting)
        return transformLaptopCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getFullLaptopInformationAdmin = async (userId) => {
    try {
        const user = await laptopCollectingModel.getFullLaptopInformationAdmin(userId)
        if (!user) {
            throw new Error('not Found')
        }
        const transformLaptopCollecting = cloneDeep(user)
        return transformLaptopCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (src, data) => {
    try {
        const updateData = {
            ...data,
            updateAt: Date.now()
        }
        const updatedUser = await laptopCollectingModel.update(src, updateData)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

export const laptopCollectingService = { 
    createNew, 
    getSearchLaptopInformation, 
    getFullLaptopInformationAdmin, 
    getFullLaptopCollecting, 
    update,
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