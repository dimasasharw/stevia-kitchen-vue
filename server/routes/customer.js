const customerController = require('../controllers/customerController')
const {authentication, customerAuthorization} = require('../middlewares/authentication')
const router = require("express").Router()


router.post('/register', customerController.registerCustomer)
router.post('/login', customerController.loginCustomer)
router.post('/google-sign-in', customerController.googleLoginCustomer)
router.use(authentication)
router.get('/menus', customerController.getMenusCustomer)
router.get('/menus/:menuId', customerController.detailMenuCustomer) 
router.get('/transactions', customerController.getCustomerTransaction)
router.post('/transactions/:menuId', customerAuthorization, customerController.createTransaction)
router.post('/midtrans-token/:transactionId', customerController.midtransPayment)
router.patch('/transactions/:transactionId', customerController.changeStatusPayment)

router.delete('/transactions/:transactionId', customerController.deleteTransaction)

module.exports = router
