import express from 'express'
import { employeeChartController } from '*/controllers/Admin/chart/employeeChart.controller'
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

router.route('/totalEmployee')
    .get(authAdmin, employeeChartController.getTotalEmployee)

router.route('/totalEmployeeWorking')
    .get(authAdmin, employeeChartController.getTotalEmployeeWorking)

router.route('/totalAgeEmployee')
    .get(authAdmin, employeeChartController.getTotalAgeEmployee)

router.route('/totalRole')
    .get(authAdmin, employeeChartController.getTotalRole)

router.route('/totalSoldInMonth')
    .get(authAdmin, employeeChartController.getTotalSoldInMonth)

router.route('/totalChartSoldInMonth')
    .get(authAdmin, employeeChartController.getTotalChartSoldInMonth)

router.route('/totalChartOrderInMonth')
    .get(authAdmin, employeeChartController.getTotalChartOrderInMonth)

router.route('/totalOrderInMonth')
    .get(authAdmin, employeeChartController.getTotalOrderInMonth)

router.route('/topEmployeeHighestValue')
    .get(authAdmin, employeeChartController.getTopEmployeeHighestValue)

router.route('/topEmployeeHighestOrder')
    .get(authAdmin, employeeChartController.getTopEmployeeHighestOrder)

router.route('/topEmployeeHighestValueInYear')
    .get(authAdmin, employeeChartController.getTopEmployeeHighestValueInYear)

router.route('/topEmployeeHighestOrderInYear')
    .get(authAdmin, employeeChartController.getTopEmployeeHighestOrderInYear)

export const employeeChartRoutes = router