import express from 'express'
import userController from '../controllers/UserController'

const router = express.Router()

router.get('/', userController.getUsers)
router.post('/login', userController.loginUser)
router.post('/signup', userController.signUpUser)
router.put('/edit', userController.updateUser)
router.get('/:id', userController.getUser)
router.delete('/:id', userController.deleteUser)

export default router
