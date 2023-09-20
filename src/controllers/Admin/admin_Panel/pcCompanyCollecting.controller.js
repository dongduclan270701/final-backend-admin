import { pcCompanyCollectingService } from '*/services/Admin/admin_Panel/pcCompanyCollecting.service'
import { HttpStatusCode } from '*/utils/constants'

const createNew = async (req, res) => {
    try {
        const data = req.body
        const result = await pcCompanyCollectingService.createNew(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullPcCompanyCollecting = async (req, res) => {
    try {
        const data = req.query
        const result = await pcCompanyCollectingService.getFullPcCompanyCollecting(data, req.result)
        
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullPcCompanyInformationAdmin = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pcCompanyCollectingService.getFullPcCompanyInformationAdmin(id)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getSearchPcCompanyInformation = async (req, res) => {
    try {
        const data = req.query
        const result = await pcCompanyCollectingService.getSearchPcCompanyInformation(data)
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
        const result = await pcCompanyCollectingService.update(src, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const pcCompanyCollectingController = { 
    createNew, 
    getSearchPcCompanyInformation, 
    getFullPcCompanyInformationAdmin, 
    getFullPcCompanyCollecting, 
    update
}