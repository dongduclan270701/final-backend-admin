import { laptopGamingCollectingService } from '*/services/Admin/admin_Panel/laptopGamingCollecting.service'
import { HttpStatusCode } from '*/utils/constants'

const createNew = async (req, res) => {
    try {
        const data = req.body
        const result = await laptopGamingCollectingService.createNew(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullLaptopGamingCollecting = async (req, res) => {
    try {
        const data = req.query
        const result = await laptopGamingCollectingService.getFullLaptopGamingCollecting(data, req.result)
        
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullLaptopGamingInformationAdmin = async (req, res) => {
    try {
        const { id } = req.params
        const result = await laptopGamingCollectingService.getFullLaptopGamingInformationAdmin(id)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getSearchLaptopGamingInformation = async (req, res) => {
    try {
        const data = req.query
        const result = await laptopGamingCollectingService.getSearchLaptopGamingInformation(data)
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
        const result = await laptopGamingCollectingService.update(src, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const laptopGamingCollectingController = { 
    createNew, 
    getSearchLaptopGamingInformation, 
    getFullLaptopGamingInformationAdmin, 
    getFullLaptopGamingCollecting, 
    update
}