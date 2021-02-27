import express from 'express'
import transactionsController from '../controllers/TransactionsController'

const router = express.Router()

router.get('/', transactionsController.getTransactions)
router.post('/', transactionsController.createTransaction)

export default router
