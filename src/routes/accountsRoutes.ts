import express from 'express'
import { getAccounts , getAccount } from '../controllers/AccountController'

const router = express.Router()

router.get('/', getAccounts)
router.get('/:id', getAccount)

export default router
