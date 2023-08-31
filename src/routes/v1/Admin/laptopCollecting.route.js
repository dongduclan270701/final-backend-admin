import express from 'express'
import { laptopCollectingController } from '*/controllers/Admin/laptopCollecting.controller'
import { laptopCollectingValidation } from '*/validations/laptopCollecting.validation'
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
    .get(authAdmin, laptopCollectingController.getFullLaptopCollecting)
    .post(authAdmin, laptopCollectingValidation.createNew, laptopCollectingController.createNew)

router.route('/totalGoods')
    .get(authAdmin, laptopCollectingController.getTotalGoods)

router.route('/totalOutOfStock')
    .get(authAdmin, laptopCollectingController.getTotalOutOfStock)

router.route('/totalAInStock')
    .get(authAdmin, laptopCollectingController.getTotalAInStock)

router.route('/totalSoldOfMonth')
    .get(authAdmin, laptopCollectingController.getTotalSoldAndProfitOfMonth)

router.route('/totalViewInMonth')
    .get(authAdmin, laptopCollectingController.getTotalViewInMonth)

router.route('/totalSoldInYear')
    .get(authAdmin, laptopCollectingController.getTotalSoldInYear)

router.route('/totalViewInYear')
    .get(authAdmin, laptopCollectingController.getTotalViewInYear)

router.route('/totalSoldByDay')
    .get(authAdmin, laptopCollectingController.getTotalSoldByDay)

router.route('/totalViewByDay')
    .get(authAdmin, laptopCollectingController.getTotalViewByDay)

router.route('/countGoodsByCategory')
    .get(authAdmin, laptopCollectingController.getCountGoodsByCategory)

router.route('/soldProductsByCategory')
    .get(authAdmin, laptopCollectingController.getSoldProductsByCategory)

router.route('/topSoldProducts')
    .get(authAdmin, laptopCollectingController.getTopSoldProducts)

router.route('/topViewProducts')
    .get(authAdmin, laptopCollectingController.getTopViewProducts)

router.route('/search')
    .get(authAdmin, laptopCollectingController.getSearchLaptopInformation)

router.route('/secretAdmin/:id')
    .get(authAdmin, laptopCollectingController.getFullLaptopInformationAdmin)

router.route('/:src')
    .put(authAdmin, laptopCollectingValidation.update, laptopCollectingController.update)

export const laptopCollectingRoutes = router