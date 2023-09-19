import { laptopGamingCollectingModel } from '*/models/Admin/admin_Panel/laptopGamingCollecting.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
    try {
        const newLaptopGamingCollecting = await laptopGamingCollectingModel.createNew(data)
        const getNewLaptopGamingCollecting = await laptopGamingCollectingModel.findOneById(newLaptopGamingCollecting.insertedId.toString())
        return getNewLaptopGamingCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getFullLaptopGamingCollecting = async (data, role) => {
    try {
        const laptopGamingCollecting = await laptopGamingCollectingModel.getFullLaptopGamingCollecting(data, role)
        const transformLaptopGamingCollecting = cloneDeep(laptopGamingCollecting)
        return transformLaptopGamingCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchLaptopGamingInformation = async (data) => {
    try {
        const laptopGamingCollecting = await laptopGamingCollectingModel.getSearchLaptopGamingInformation(data)
        const transformLaptopGamingCollecting = cloneDeep(laptopGamingCollecting)
        return transformLaptopGamingCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getFullLaptopGamingInformationAdmin = async (userId) => {
    try {
        const user = await laptopGamingCollectingModel.getFullLaptopGamingInformationAdmin(userId)
        if (!user) {
            throw new Error('not Found')
        }
        const transformLaptopGamingCollecting = cloneDeep(user)
        return transformLaptopGamingCollecting
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
        const updatedUser = await laptopGamingCollectingModel.update(src, updateData)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

export const laptopGamingCollectingService = { 
    createNew, 
    getSearchLaptopGamingInformation, 
    getFullLaptopGamingInformationAdmin, 
    getFullLaptopGamingCollecting, 
    update
}