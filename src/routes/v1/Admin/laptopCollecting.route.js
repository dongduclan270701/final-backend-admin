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
        } else {
            return res.status(401).json({ message: 'You do not have sufficient permissions to perform this function' })
        }

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).send('Invalid token')
    }
}

const router = express.Router()

router.route('/')
    .get(authAdmin, laptopCollectingController.getFullLaptopCollecting)
    .post(authAdmin, laptopCollectingValidation.createNew, laptopCollectingController.createNew)

router.route('/search')
    .get(authAdmin, laptopCollectingController.getSearchLaptopInformation)
    
router.route('/secretAdmin/:id')
    .get(authAdmin, laptopCollectingController.getFullLaptopInformationAdmin)

router.route('/:src')
    .put(authAdmin, laptopCollectingValidation.update, laptopCollectingController.update)

export const laptopCollectingRoutes = router