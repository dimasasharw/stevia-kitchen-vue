
const { verifyToken } = require('../helpers/jwt')
const {User} = require('../models')

const authentication = async (req, res, next )=>{
    try {
        const access_token = req.headers.access_token
        if (!access_token) throw { name: "Unauthorized" }

        const payload= verifyToken(access_token)
        if (!payload) throw { name: "Unauthorized" }

        const foundUser = await User.findOne({where:{id:payload.id}})
        if (!foundUser) throw { name: "Unauthorized" }
        
        req.user = {id:payload.id, email:payload.email, role: foundUser.role}

        next()
    } catch (error) {
        console.log(error);
        next(error)
    }

}

const adminAthorization = async (req, res, next) => {
    try {
        const userLogin = req.user
        const findCustomer = await User.findByPk(userLogin.id)

        if(findCustomer.role !== 'admin') throw {name: 'Forbidden'}
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const customerAuthorization = async (req, res, next) => {
    try {
        const userLogin = req.user
        const findCustomer = await User.findByPk(userLogin.id)

        if(findCustomer.role !== 'customer') throw {name: 'Forbidden'}
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = {authentication, adminAthorization, customerAuthorization}