import express from 'express'
import accountController from '../controllers/AccountController'

const router = express.Router()

router.get('/', accountController.getAccounts)
router.get('/:id', accountController.getAccount)

export default router
