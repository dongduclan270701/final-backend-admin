import express from 'express'
import { appleCollectingController } from '*/controllers/Admin/admin_Panel/appleCollecting.controller'
import { appleCollectingValidation } from '*/validations/appleCollecting.validation'
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
    .get(authAdmin, appleCollectingController.getFullAppleCollecting)
    .post(authAdmin, appleCollectingValidation.createNew, appleCollectingController.createNew)

router.route('/search')
    .get(authAdmin, appleCollectingController.getSearchAppleInformation)

router.route('/secretAdmin/:id')
    .get(authAdmin, appleCollectingController.getFullAppleInformationAdmin)

router.route('/:src')
    .put(authAdmin, appleCollectingValidation.update, appleCollectingController.update)

export const appleCollectingRoutes = router