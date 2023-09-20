import express from 'express'
import { pcCompanyCollectingController } from '*/controllers/Admin/admin_Panel/pcCompanyCollecting.controller'
import { pcCompanyCollectingValidation } from '*/validations/pcCompanyCollecting.validation'
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
        } else if (verified.role === 'PRODUCT') {
            next()
        } else {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'You do not have sufficient permissions to perform this function' })
        }
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).send('Invalid token')
    }
}

const router = express.Router()

router.route('/')
    .get(authAdmin, pcCompanyCollectingController.getFullPcCompanyCollecting)
    .post(authAdmin, pcCompanyCollectingValidation.createNew, pcCompanyCollectingController.createNew)

router.route('/search')
    .get(authAdmin, pcCompanyCollectingController.getSearchPcCompanyInformation)

router.route('/secretAdmin/:id')
    .get(authAdmin, pcCompanyCollectingController.getFullPcCompanyInformationAdmin)

router.route('/:src')
    .put(authAdmin, pcCompanyCollectingValidation.update, pcCompanyCollectingController.update)

export const pcCompanyCollectingRoutes = router