import express from 'express'
import { HttpStatusCode } from '*/utils/constants'
import { laptopCollectingRoutes } from './Admin/laptopCollecting.route'
import { orderAdminRoutes } from './Admin/orderAdmin.route'
import { adminRoutes } from './Admin/admin.route'
import { userAdminRoutes } from './Admin/userAdmin.route'
import { voucherAdminRoutes } from './Admin/voucherAdmin.route'
import { collectingAdminRoutes } from './Admin/collectingAdmin.route'
import { productChartRoutes } from './Admin/productChart.route'
import { employeeChartRoutes } from './Admin/employeeChart.route'
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

router.use('/voucherAdmin', voucherAdminRoutes)

router.use('/collecting', collectingAdminRoutes)

router.use('/productChart', productChartRoutes)

router.use('/employeeChart', employeeChartRoutes)

export const apiV1 = router