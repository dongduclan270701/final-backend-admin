import { pcGamingCollectingModel } from '*/models/Admin/admin_Panel/pcGamingCollecting.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
    try {
        const newPcGamingCollecting = await pcGamingCollectingModel.createNew(data)
        const getNewPcGamingCollecting = await pcGamingCollectingModel.findOneById(newPcGamingCollecting.insertedId.toString())
        return getNewPcGamingCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getFullPcGamingCollecting = async (data, role) => {
    try {
        const pcGamingCollecting = await pcGamingCollectingModel.getFullPcGamingCollecting(data, role)
        const transformPcGamingCollecting = cloneDeep(pcGamingCollecting)
        return transformPcGamingCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchPcGamingInformation = async (data) => {
    try {
        const pcGamingCollecting = await pcGamingCollectingModel.getSearchPcGamingInformation(data)
        const transformPcGamingCollecting = cloneDeep(pcGamingCollecting)
        return transformPcGamingCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getFullPcGamingInformationAdmin = async (userId) => {
    try {
        const user = await pcGamingCollectingModel.getFullPcGamingInformationAdmin(userId)
        if (!user) {
            throw new Error('not Found')
        }
        const transformPcGamingCollecting = cloneDeep(user)
        return transformPcGamingCollecting
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
        const updatedUser = await pcGamingCollectingModel.update(src, updateData)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

export const pcGamingCollectingService = { 
    createNew, 
    getSearchPcGamingInformation, 
    getFullPcGamingInformationAdmin, 
    getFullPcGamingCollecting, 
    update
}