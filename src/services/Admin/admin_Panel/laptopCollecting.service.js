import { laptopCollectingModel } from '*/models/Admin/admin_Panel/laptopCollecting.model'
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
    update
}