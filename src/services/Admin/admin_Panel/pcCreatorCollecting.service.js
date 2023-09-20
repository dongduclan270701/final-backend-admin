import { pcCreatorCollectingModel } from '*/models/Admin/admin_Panel/pcCreatorCollecting.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
    try {
        const newPcCreatorCollecting = await pcCreatorCollectingModel.createNew(data)
        const getNewPcCreatorCollecting = await pcCreatorCollectingModel.findOneById(newPcCreatorCollecting.insertedId.toString())
        return getNewPcCreatorCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getFullPcCreatorCollecting = async (data, role) => {
    try {
        const pcCreatorCollecting = await pcCreatorCollectingModel.getFullPcCreatorCollecting(data, role)
        const transformPcCreatorCollecting = cloneDeep(pcCreatorCollecting)
        return transformPcCreatorCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchPcCreatorInformation = async (data) => {
    try {
        const pcCreatorCollecting = await pcCreatorCollectingModel.getSearchPcCreatorInformation(data)
        const transformPcCreatorCollecting = cloneDeep(pcCreatorCollecting)
        return transformPcCreatorCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getFullPcCreatorInformationAdmin = async (userId) => {
    try {
        const user = await pcCreatorCollectingModel.getFullPcCreatorInformationAdmin(userId)
        if (!user) {
            throw new Error('not Found')
        }
        const transformPcCreatorCollecting = cloneDeep(user)
        return transformPcCreatorCollecting
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
        const updatedUser = await pcCreatorCollectingModel.update(src, updateData)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

export const pcCreatorCollectingService = { 
    createNew, 
    getSearchPcCreatorInformation, 
    getFullPcCreatorInformationAdmin, 
    getFullPcCreatorCollecting, 
    update
}