import express from 'express'
import { orderAdminController } from '*/controllers/Admin/orderAdmin.controller'
import { orderAdminValidation } from '*/validations/orderAdmin.validation'
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
        } else if (verified.role === 'ORDER') {
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
    .get(authAdmin, orderAdminController.getFullOrder)

router.route('/search')
    .get(authAdmin, orderAdminController.getSearchOrder)

router.route('/:id')
    .get(authAdmin, orderAdminController.getFullOrderInformation)
    .put(authAdmin, orderAdminValidation.updateOrder, orderAdminController.updateOrder)

router.route('/ratingOrder/:id')
    .put(authAdmin, orderAdminController.ratingOrder)
    
export const orderAdminRoutes = router