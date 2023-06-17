import { voucherAdminService } from '*/services/Admin/voucherAdmin.service'
import { HttpStatusCode } from '*/utils/constants'

const createNewVoucher = async (req, res) => {
    try {
        const data = req.body
        const result = await voucherAdminService.createNewVoucher(data, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}
const getFullVoucher = async (req, res) => {

    try {
        const data = req.query
        const result = await voucherAdminService.getFullVoucher(data, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getVoucherInformation = async (req, res) => {
    try {
        const { id } = req.params
        const result = await voucherAdminService.getVoucherInformation(id, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getSearchVoucher = async (req, res) => {
    try {
        const data = req.query
        const result = await voucherAdminService.getSearchVoucher(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const updateVoucher = async (req, res) => {
    try {
        const { id } = req.params
        const result = await voucherAdminService.updateVoucher(id, req.body, req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const voucherAdminController = { 
    createNewVoucher,
    getFullVoucher,
    getSearchVoucher,
    getVoucherInformation,
    updateVoucher
}