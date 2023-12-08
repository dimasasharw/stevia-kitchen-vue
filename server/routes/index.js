const express = require('express')
const adminController = require('../controllers/adminController')
const router = express.Router()
const customerRouter = require("./customer")
const { authentication, adminAthorization } = require('../middlewares/authentication')

router.use('/customers', customerRouter)
router.post('/register', adminController.registerAdmin)
router.post('/login', adminController.loginAdmin)

router.use(authentication)
router.get('/menus', adminController.getMenus)
router.post('/menus', adminController.addMenu)
router.get('/menus/:id') //get menu by id
router.put('/menus/:id', adminController.editMenu)
router.delete('/menus/:id', adminController.deleteMenu)

module.exports = router
