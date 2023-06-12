import { userAdminModel } from '*/models/Admin/userAdmin.model'
import { cloneDeep } from 'lodash'


const getFullUser = async (data, role) => {
    try {
        const user = await userAdminModel.getFullUser(data, role)
        const transformUser = cloneDeep(user)
        return transformUser
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchUser = async (data) => {
    try {
        const user = await userAdminModel.getSearchUser(data)
        const transformUser = cloneDeep(user)
        return transformUser
    } catch (error) {
        throw new Error(error)
    }
}

const getUserInformation = async (id) => {
    try {
        const user = await userAdminModel.getUserInformation(id)
        if (!user) {
            throw new Error('not Found')
        }

        const transfromUser = cloneDeep(user)

        return transfromUser
    } catch (error) {
        throw new Error(error)
    }
}

const updateStatusUser = async (id, data) => {
    try {
        const updatedUser = await userAdminModel.updateStatusUser(id, data)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

export const userAdminService = { 
    getFullUser,
    getSearchUser,
    getUserInformation,
    updateStatusUser
}