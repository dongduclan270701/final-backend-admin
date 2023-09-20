import { pcCreatorCollectingService } from '*/services/Admin/admin_Panel/pcCreatorCollecting.service'
import { HttpStatusCode } from '*/utils/constants'

const createNew = async (req, res) => {
    try {
        const data = req.body
        const result = await pcCreatorCollectingService.createNew(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullPcCreatorCollecting = async (req, res) => {
    try {
        const data = req.query
        const result = await pcCreatorCollectingService.getFullPcCreatorCollecting(data, req.result)
        
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullPcCreatorInformationAdmin = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pcCreatorCollectingService.getFullPcCreatorInformationAdmin(id)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getSearchPcCreatorInformation = async (req, res) => {
    try {
        const data = req.query
        const result = await pcCreatorCollectingService.getSearchPcCreatorInformation(data)
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
        const result = await pcCreatorCollectingService.update(src, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const pcCreatorCollectingController = { 
    createNew, 
    getSearchPcCreatorInformation, 
    getFullPcCreatorInformationAdmin, 
    getFullPcCreatorCollecting, 
    update
}