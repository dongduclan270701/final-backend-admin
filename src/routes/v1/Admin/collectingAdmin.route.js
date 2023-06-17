import express from 'express'
import { collectingAdminController } from '*/controllers/Admin/collectingAdmin.controller'

const router = express.Router()

router.route('/:name')
    .get(collectingAdminController.getCollectingByName)
router.route('/')
    .get(collectingAdminController.getFullCollection)

export const collectingAdminRoutes = router