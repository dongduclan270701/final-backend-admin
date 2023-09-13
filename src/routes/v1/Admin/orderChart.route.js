import express from 'express'
import { orderChartController } from '*/controllers/Admin/chart/orderChart.controller'
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

router.route('/totalOrder')
    .get(authAdmin, orderChartController.getTotalOrder)

router.route('/totalOrderSuccessful')
    .get(authAdmin, orderChartController.getTotalOrderSuccessful)

router.route('/totalOrderFailed')
    .get(authAdmin, orderChartController.getTotalOrderFailed)

router.route('/totalOrderByStatus')
    .get(authAdmin, orderChartController.getTotalOrderByStatus)

router.route('/totalTopOrder')
    .get(authAdmin, orderChartController.getTotalTopOrder)

router.route('/totalTopProduct')
    .get(authAdmin, orderChartController.getTotalTopProduct)

router.route('/totalTopOrderAll')
    .get(authAdmin, orderChartController.getTotalTopOrderAll)

router.route('/totalTopProductAll')
    .get(authAdmin, orderChartController.getTotalTopProductAll)

router.route('/totalOrdersByDay')
    .get(authAdmin, orderChartController.getTotalOrdersByDay)

export const orderChartRoutes = router