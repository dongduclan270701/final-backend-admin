import { appleCollectingModel } from '*/models/Admin/admin_Panel/appleCollecting.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
    try {
        const newAppleCollecting = await appleCollectingModel.createNew(data)
        const getNewAppleCollecting = await appleCollectingModel.findOneById(newAppleCollecting.insertedId.toString())
        return getNewAppleCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getFullAppleCollecting = async (data, role) => {
    try {
        const appleCollecting = await appleCollectingModel.getFullAppleCollecting(data, role)
        const transformAppleCollecting = cloneDeep(appleCollecting)
        return transformAppleCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchAppleInformation = async (data) => {
    try {
        const appleCollecting = await appleCollectingModel.getSearchAppleInformation(data)
        const transformAppleCollecting = cloneDeep(appleCollecting)
        return transformAppleCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getFullAppleInformationAdmin = async (userId) => {
    try {
        const user = await appleCollectingModel.getFullAppleInformationAdmin(userId)
        if (!user) {
            throw new Error('not Found')
        }
        const transformAppleCollecting = cloneDeep(user)
        return transformAppleCollecting
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
        const updatedUser = await appleCollectingModel.update(src, updateData)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

export const appleCollectingService = { 
    createNew, 
    getSearchAppleInformation, 
    getFullAppleInformationAdmin, 
    getFullAppleCollecting, 
    update
}