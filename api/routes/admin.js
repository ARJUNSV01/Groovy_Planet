import express from 'express'
import { blockUser, fetchUsers, unBlockUser } from '../controllers/admin.js'

const router = express.Router()

router.get('/fetchUsers',fetchUsers)
router.patch('/blockUser',blockUser)
router.patch('/unBlockUser',unBlockUser)
export default router