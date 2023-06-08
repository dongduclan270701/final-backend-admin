import express from 'express'
import { HttpStatusCode } from '*/utils/constants'
import { laptopCollectingRoutes } from './Admin/laptopCollecting.route'
import { orderAdminRoutes } from './Admin/orderAdmin.route'
import { adminRoutes } from './Admin/admin.route'
import { userAdminRoutes } from './Admin/userAdmin.route'
const router = express.Router()

// GET v1/status
router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({
    status: 'OK'
}))

//User APIs
router.use('/admin', adminRoutes)

router.use('/managementUser', userAdminRoutes)

router.use('/laptopCollecting', laptopCollectingRoutes)

router.use('/orderAdmin', orderAdminRoutes)

export const apiV1 = router