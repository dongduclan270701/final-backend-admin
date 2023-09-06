import express from 'express'
import { productChartController } from '*/controllers/Admin/productChart.controller'
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

router.route('/totalGoods')
    .get(authAdmin, productChartController.getTotalGoods)

router.route('/totalOutOfStock')
    .get(authAdmin, productChartController.getTotalOutOfStock)

router.route('/totalAInStock')
    .get(authAdmin, productChartController.getTotalAInStock)

router.route('/totalSoldOfMonth')
    .get(authAdmin, productChartController.getTotalSoldAndProfitOfMonth)

router.route('/totalViewInMonth')
    .get(authAdmin, productChartController.getTotalViewInMonth)

router.route('/totalSoldInYear')
    .get(authAdmin, productChartController.getTotalSoldInYear)

router.route('/totalViewInYear')
    .get(authAdmin, productChartController.getTotalViewInYear)

router.route('/totalSoldByDay')
    .get(authAdmin, productChartController.getTotalSoldByDay)

router.route('/totalViewByDay')
    .get(authAdmin, productChartController.getTotalViewByDay)

router.route('/countGoodsByCategory')
    .get(authAdmin, productChartController.getCountGoodsByCategory)

router.route('/soldProductsByCategory')
    .get(authAdmin, productChartController.getSoldProductsByCategory)

router.route('/topSoldProducts')
    .get(authAdmin, productChartController.getTopSoldProducts)

router.route('/topViewProducts')
    .get(authAdmin, productChartController.getTopViewProducts)

export const productChartRoutes = router