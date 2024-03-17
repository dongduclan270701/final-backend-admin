import { requestService } from '*/services/Admin/request.service'
import { HttpStatusCode } from '*/utils/constants'

const getFullRequestWebsite = async (req, res) => {
    try {
        const data = req.query
        const result = await requestService.getFullRequestWebsite(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullRequestAds = async (req, res) => {
    try {
        const data = req.query
        const result = await requestService.getFullRequestAds(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const requestController = {
    getFullRequestWebsite,
    getFullRequestAds
}