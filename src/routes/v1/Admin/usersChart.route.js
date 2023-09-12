import express from 'express'
import { usersChartController } from '*/controllers/Admin/chart/usersChart.controller'
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

router.route('/totalUsers')
    .get(authAdmin, usersChartController.getTotalUsers)

router.route('/totalUserLoginLastMonth')
    .get(authAdmin, usersChartController.getTotalUserLoginLastMonth)

router.route('/totalUserLoginOverMonth')
    .get(authAdmin, usersChartController.getTotalUserLoginOverMonth)

router.route('/totalUserAddGoodsToWishlist')
    .get(authAdmin, usersChartController.getTotalUserAddGoodsToWishlist)

router.route('/totalUserPurchased')
    .get(authAdmin, usersChartController.getTotalUserPurchased)

router.route('/totalUserJoinInMonth')
    .get(authAdmin, usersChartController.getTotalUserJoinInMonth)

router.route('/totalAgeUser')
    .get(authAdmin, usersChartController.getTotalAgeUser)

router.route('/totalStatusUser')
    .get(authAdmin, usersChartController.getTotalStatusUser)

router.route('/topUserHighestValue')
    .get(authAdmin, usersChartController.getTopUserHighestValue)

router.route('/topUserHighestOrder')
    .get(authAdmin, usersChartController.getTopUserHighestOrder)

router.route('/topUserHighestValueAll')
    .get(authAdmin, usersChartController.getTopUserHighestValueAll)

router.route('/topUserHighestOrderAll')
    .get(authAdmin, usersChartController.getTopUserHighestOrderAll)

export const usersChartRoutes = router