import { userAdminService } from '*/services/Admin/userAdmin.service'
import { HttpStatusCode } from '*/utils/constants'

const getFullUser = async (req, res) => {

    try {
        const data = req.query
        const result = await userAdminService.getFullUser(data, req.result)
        res.status(HttpStatusCode.OK).json(result)

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getUserInformation = async (req, res) => {
    try {
        const { id } = req.params
        const result = await userAdminService.getUserInformation(id)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getSearchUser = async (req, res) => {
    try {
        const data = req.query
        const result = await userAdminService.getSearchUser(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const updateStatusUser = async (req, res) => {
    try {
        const { id } = req.params
        const result = await userAdminService.updateStatusUser(id, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const userAdminController = { 
    getFullUser,
    getSearchUser,
    getUserInformation,
    updateStatusUser
}