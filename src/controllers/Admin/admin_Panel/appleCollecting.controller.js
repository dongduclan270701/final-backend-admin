import { appleCollectingService } from '*/services/Admin/admin_Panel/appleCollecting.service'
import { HttpStatusCode } from '*/utils/constants'

const createNew = async (req, res) => {
    try {
        const data = req.body
        const result = await appleCollectingService.createNew(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullAppleCollecting = async (req, res) => {
    try {
        const data = req.query
        const result = await appleCollectingService.getFullAppleCollecting(data, req.result)
        
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullAppleInformationAdmin = async (req, res) => {
    try {
        const { id } = req.params
        const result = await appleCollectingService.getFullAppleInformationAdmin(id)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getSearchAppleInformation = async (req, res) => {
    try {
        const data = req.query
        const result = await appleCollectingService.getSearchAppleInformation(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const { src } = req.params
        const result = await appleCollectingService.update(src, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const appleCollectingController = { 
    createNew, 
    getSearchAppleInformation, 
    getFullAppleInformationAdmin, 
    getFullAppleCollecting, 
    update
}