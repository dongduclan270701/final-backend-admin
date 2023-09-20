import express from 'express'
import { HttpStatusCode } from '*/utils/constants'
import { laptopCollectingRoutes } from './Admin/admin_Panel/laptopCollecting.route'
import { laptopGamingCollectingRoutes } from './Admin/admin_Panel/laptopGamingCollecting.route'
import { pcGamingCollectingRoutes } from './Admin/admin_Panel/pcGamingCollecting.route'
import { pcCreatorCollectingRoutes } from './Admin/admin_Panel/pcCreatorCollecting.route'
import { pcCompanyCollectingRoutes } from './Admin/admin_Panel/pcCompanyCollecting.route'
import { orderAdminRoutes } from './Admin/orderAdmin.route'
import { adminRoutes } from './Admin/admin.route'
import { userAdminRoutes } from './Admin/userAdmin.route'
import { voucherAdminRoutes } from './Admin/voucherAdmin.route'
import { collectingAdminRoutes } from './Admin/collectingAdmin.route'
import { productChartRoutes } from './Admin/productChart.route'
import { employeeChartRoutes } from './Admin/employeeChart.route'
import { usersChartRoutes } from './Admin/usersChart.route'
import { orderChartRoutes } from './Admin/orderChart.route'
import { dashboardRoutes } from './Admin/dashboard.route'
const router = express.Router()

// GET v1/status
router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({
    status: 'OK'
}))

//User APIs
router.use('/admin', adminRoutes)

router.use('/managementUser', userAdminRoutes)

router.use('/laptopCollecting', laptopCollectingRoutes)

router.use('/laptopGamingCollecting', laptopGamingCollectingRoutes)

router.use('/pcGamingCollecting', pcGamingCollectingRoutes)

router.use('/pcCreatorCollecting', pcCreatorCollectingRoutes)

router.use('/pcCompanyCollecting', pcCompanyCollectingRoutes)

router.use('/orderAdmin', orderAdminRoutes)

router.use('/voucherAdmin', voucherAdminRoutes)

router.use('/collecting', collectingAdminRoutes)

router.use('/productChart', productChartRoutes)

router.use('/employeeChart', employeeChartRoutes)

router.use('/usersChart', usersChartRoutes)

router.use('/orderChart', orderChartRoutes)

router.use('/dashboard', dashboardRoutes)

export const apiV1 = router