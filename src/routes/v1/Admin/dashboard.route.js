import express from 'express'
import { dashboardController } from '*/controllers/Admin/chart/dashboard.controller'
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

router.route('/topSoldProducts')
    .get(authAdmin, dashboardController.getTopSoldProducts)

router.route('/topViewProducts')
    .get(authAdmin, dashboardController.getTopViewProducts)

router.route('/totalOrder')
    .get(authAdmin, dashboardController.getTotalOrder)

router.route('/totalOrderSuccessful')
    .get(authAdmin, dashboardController.getTotalOrderSuccessful)

    router.route('/topEmployeeHighestValueInYearNotLimit')
    .get(authAdmin, dashboardController.getTopEmployeeHighestValueInYearNotLimit)

export const dashboardRoutes = router