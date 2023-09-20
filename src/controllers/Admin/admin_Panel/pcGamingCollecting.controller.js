import { pcGamingCollectingService } from '*/services/Admin/admin_Panel/pcGamingCollecting.service'
import { HttpStatusCode } from '*/utils/constants'

const createNew = async (req, res) => {
    try {
        const data = req.body
        const result = await pcGamingCollectingService.createNew(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullPcGamingCollecting = async (req, res) => {
    try {
        const data = req.query
        const result = await pcGamingCollectingService.getFullPcGamingCollecting(data, req.result)
        
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullPcGamingInformationAdmin = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pcGamingCollectingService.getFullPcGamingInformationAdmin(id)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getSearchPcGamingInformation = async (req, res) => {
    try {
        const data = req.query
        const result = await pcGamingCollectingService.getSearchPcGamingInformation(data)
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
        const result = await pcGamingCollectingService.update(src, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const pcGamingCollectingController = { 
    createNew, 
    getSearchPcGamingInformation, 
    getFullPcGamingInformationAdmin, 
    getFullPcGamingCollecting, 
    update
}