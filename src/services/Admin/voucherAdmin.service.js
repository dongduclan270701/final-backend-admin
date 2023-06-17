import { voucherAdminModel } from '*/models/Admin/voucherAdmin.model'
import { cloneDeep } from 'lodash'

const createNewVoucher = async (data, role) => {
    try {
        const newVoucher = await voucherAdminModel.createNewVoucher(data, role)
        if (newVoucher.message === 'Discount code already exists') {
            return newVoucher
        }
        else {
            const getNewVoucher = await voucherAdminModel.findOneById(newVoucher.insertedId.toString())
            return getNewVoucher
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getFullVoucher = async (data, role) => {
    try {
        const voucher = await voucherAdminModel.getFullVoucher(data, role)
        const transformVoucher = cloneDeep(voucher)
        return transformVoucher
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchVoucher = async (data) => {
    try {
        const voucher = await voucherAdminModel.getSearchVoucher(data)
        const transformVoucher = cloneDeep(voucher)
        return transformVoucher
    } catch (error) {
        throw new Error(error)
    }
}

const getVoucherInformation = async (id, role) => {
    try {
        const voucher = await voucherAdminModel.getVoucherInformation(id, role)
        if (!voucher) {
            throw new Error('not Found')
        }
        const transformVoucher = cloneDeep(voucher)
        return transformVoucher
    } catch (error) {
        throw new Error(error)
    }
}

const updateVoucher = async (id, data, role) => {
    try {
        const updatedUser = await voucherAdminModel.updateVoucher(id, data, role)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

export const voucherAdminService = { 
    createNewVoucher,
    getFullVoucher,
    getSearchVoucher,
    getVoucherInformation,
    updateVoucher
}