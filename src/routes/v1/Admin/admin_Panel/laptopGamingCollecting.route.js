import express from 'express'
import { laptopGamingCollectingController } from '*/controllers/Admin/admin_Panel/laptopGamingCollecting.controller'
import { laptopGamingCollectingValidation } from '*/validations/laptopGamingCollecting.validation'
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
    .get(authAdmin, laptopGamingCollectingController.getFullLaptopGamingCollecting)
    .post(authAdmin, laptopGamingCollectingValidation.createNew, laptopGamingCollectingController.createNew)

router.route('/search')
    .get(authAdmin, laptopGamingCollectingController.getSearchLaptopGamingInformation)

router.route('/secretAdmin/:id')
    .get(authAdmin, laptopGamingCollectingController.getFullLaptopGamingInformationAdmin)

router.route('/:src')
    .put(authAdmin, laptopGamingCollectingValidation.update, laptopGamingCollectingController.update)

export const laptopGamingCollectingRoutes = router