import express from 'express'
import {
  createTransaction,
  getTransactions,
} from '../controllers/TransactionsController'

const router = express.Router()

router.get('/', getTransactions)
router.post('/', createTransaction)

export default router
