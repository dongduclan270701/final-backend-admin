import { collectingAdminModel } from '*/models/Admin/collectingAdmin.model'
import { cloneDeep } from 'lodash'

const getCollectingByName = async (userId) => {
    try {
        const collection = await collectingAdminModel.getCollectingByName(userId)
        if (!collection) {
            throw new Error('not Found')
        }
        const transformCollection = cloneDeep(collection)
        return transformCollection
    } catch (error) {
        throw new Error(error)
    }
}
const getFullCollection = async () => {
    try {
        const collection = await collectingAdminModel.getFullCollection()
        const transformCollection = cloneDeep(collection)
        return transformCollection
    } catch (error) {
        throw new Error(error)
    }
}

export const collectingAdminService = { 
    getFullCollection,
    getCollectingByName
}