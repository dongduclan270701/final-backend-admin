import { RequestModel } from '*/models/Admin/request.model'
import { cloneDeep } from 'lodash'


const getFullRequestWebsite = async (data) => {
    try {
        const order = await RequestModel.getFullRequestWebsite(data)
        const transformOrder = cloneDeep(order)
        return transformOrder
    } catch (error) {
        throw new Error(error)
    }
}


const getFullRequestAds = async (data) => {
    try {
        const order = await RequestModel.getFullRequestAds(data)
        const transformOrder = cloneDeep(order)
        return transformOrder
    } catch (error) {
        throw new Error(error)
    }
}

export const requestService = {
    getFullRequestWebsite,
    getFullRequestAds
}