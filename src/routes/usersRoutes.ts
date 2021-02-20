import express from 'express'
import {
  loginUser,
  signUpUser,
  deleteUser,
  getUsers,
  updateUser,
  getUser,
} from '../controllers/UserController'

const router = express.Router()

router.get('/', getUsers)
router.post('/login', loginUser)
router.post('/signup', signUpUser)
router.put('/edit', updateUser)
router.get('/:id', getUser)
router.delete('/:id', deleteUser)

export default router
