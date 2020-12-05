import Router from 'express'
import routerTask from './task'

const router = Router()

router.use('/api/tasks',routerTask)

export default router

