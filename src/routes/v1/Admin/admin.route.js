import express from 'express'
import { adminController } from '*/controllers/Admin/admin.controller'
import { AdminValidation } from '*/validations/admin.validation'
import jwt from 'jsonwebtoken'
import { HttpStatusCode } from '*/utils/constants'
const router = express.Router()

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
        } else {
            return res.status(401).json({ message: 'You do not have sufficient permissions to perform this function' })
        }

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).send('Invalid token')
    }
}

router.route('/')
    .get(authAdmin, adminController.getAllEmployee)
    .post(authAdmin, AdminValidation.createNewEmployee, adminController.createNewEmployee)

router.route('/login/:email/:password')
    .get(adminController.loginEmployee)

router.route('/employee/:id')
    .get(authAdmin, adminController.getInformationEmployee)
    .put(authAdmin, AdminValidation.updateEmployee, adminController.updateEmployee)

router.route('/status/:email')
    .put(authAdmin, adminController.updateStatusEmployee)

router.route('/search')
    .get(authAdmin, adminController.getSearchEmployee)

export const adminRoutes = router