import { noticeModel } from '*/models/Admin/notice.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
    try {
        const newNotice = await noticeModel.createNew(data)
        // const getNewNotice = await noticeModel.findOneById(newNotice.insertedId.toString())
        return newNotice
    } catch (error) {
        throw new Error(error)
    }
}

const getFullNotice = async () => {
    try {
        const notice = await noticeModel.getFullNotice()
        const transformNotice = cloneDeep(notice)
        return transformNotice
    } catch (error) {
        throw new Error(error)
    }
}

const getUpdateNotice = async (id) => {
    try {
        const notice = await noticeModel.getUpdateNotice(id)
        const transformNotice = cloneDeep(notice)
        return transformNotice
    } catch (error) {
        throw new Error(error)
    }
}

export const noticeService = { 
    createNew, 
    getFullNotice,
    getUpdateNotice
}