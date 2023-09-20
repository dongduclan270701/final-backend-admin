import { pcCompanyCollectingModel } from '*/models/Admin/admin_Panel/pcCompanyCollecting.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
    try {
        const newPcCompanyCollecting = await pcCompanyCollectingModel.createNew(data)
        const getNewPcCompanyCollecting = await pcCompanyCollectingModel.findOneById(newPcCompanyCollecting.insertedId.toString())
        return getNewPcCompanyCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getFullPcCompanyCollecting = async (data, role) => {
    try {
        const pcCompanyCollecting = await pcCompanyCollectingModel.getFullPcCompanyCollecting(data, role)
        const transformPcCompanyCollecting = cloneDeep(pcCompanyCollecting)
        return transformPcCompanyCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchPcCompanyInformation = async (data) => {
    try {
        const pcCompanyCollecting = await pcCompanyCollectingModel.getSearchPcCompanyInformation(data)
        const transformPcCompanyCollecting = cloneDeep(pcCompanyCollecting)
        return transformPcCompanyCollecting
    } catch (error) {
        throw new Error(error)
    }
}

const getFullPcCompanyInformationAdmin = async (userId) => {
    try {
        const user = await pcCompanyCollectingModel.getFullPcCompanyInformationAdmin(userId)
        if (!user) {
            throw new Error('not Found')
        }
        const transformPcCompanyCollecting = cloneDeep(user)
        return transformPcCompanyCollecting
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
        const updatedUser = await pcCompanyCollectingModel.update(src, updateData)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

export const pcCompanyCollectingService = { 
    createNew, 
    getSearchPcCompanyInformation, 
    getFullPcCompanyInformationAdmin, 
    getFullPcCompanyCollecting, 
    update
}