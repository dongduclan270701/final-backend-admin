import express from 'express'
import { noticeValidation } from '*/validations/notice.validation'
import { noticeController } from '*/controllers/Admin/notice.controller'
import jwt from 'jsonwebtoken'

const authAdmin = (req, res, next) => {
    const token = req.header('auth-token-admin')
    if (!token) {
        return res.status(401).send('Access Denied')
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET_ADMIN)
        req.result = verified
        next()
    } catch (error) {
        res.status(500).send('Invalid token')
    }
}

const router = express.Router()

router.route('/')
    .post(authAdmin, noticeValidation.createNew, noticeController.createNew)

router.route('/fetch')
    .get(authAdmin, noticeController.getFullNotice)
    .put(authAdmin, noticeController.getUpdateNotice)

export const noticeRoutes = router