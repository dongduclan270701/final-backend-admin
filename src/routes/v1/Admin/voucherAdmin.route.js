import express from 'express'
import { voucherAdminController } from '*/controllers/Admin/voucherAdmin.controller'
import { voucherValidation } from '*/validations/voucher.validation'
import jwt from 'jsonwebtoken'
import { HttpStatusCode } from '*/utils/constants'

const authAdmin = (req, res, next) => {
    const token = req.header('auth-token-admin')
    if (!token) {
        res.status(HttpStatusCode.UNAUTHORIZED).json('Access Denied')
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET_ADMIN)
        req.result = verified
        if (verified.role === 'CEO') {
            next()
        } else if (verified.role === 'DEVELOPER') {
            next()
        } else if (verified.role === 'MANAGEMENT') {
            next()
        } else {
            return res.status(401).json({ message: 'You do not have sufficient permissions to perform this function' })
        }
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).send('Invalid token')
    }
}

const router = express.Router()

router.route('/')
    .get(authAdmin, voucherAdminController.getFullVoucher)
    .post(authAdmin, voucherValidation.createNewVoucher, voucherAdminController.createNewVoucher)

router.route('/search')
    .get(authAdmin, voucherAdminController.getSearchVoucher)

router.route('/details/:id')
    .get(authAdmin, voucherAdminController.getVoucherInformation)
    .put(authAdmin, voucherAdminController.updateVoucher)

export const voucherAdminRoutes = router