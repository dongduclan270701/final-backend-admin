import { laptopCollectingService } from '*/services/Admin/admin_Panel/laptopCollecting.service'
import { HttpStatusCode } from '*/utils/constants'

const createNew = async (req, res) => {
    try {
        const data = req.body
        const result = await laptopCollectingService.createNew(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullLaptopCollecting = async (req, res) => {
    try {
        const data = req.query
        const result = await laptopCollectingService.getFullLaptopCollecting(data, req.result)
        
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullLaptopInformationAdmin = async (req, res) => {
    try {
        const { id } = req.params
        const result = await laptopCollectingService.getFullLaptopInformationAdmin(id)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getSearchLaptopInformation = async (req, res) => {
    try {
        const data = req.query
        const result = await laptopCollectingService.getSearchLaptopInformation(data)
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
        const result = await laptopCollectingService.update(src, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const laptopCollectingController = { 
    createNew, 
    getSearchLaptopInformation, 
    getFullLaptopInformationAdmin, 
    getFullLaptopCollecting, 
    update
}