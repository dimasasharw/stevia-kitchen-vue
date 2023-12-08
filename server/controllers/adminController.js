const { comparePassword } = require('../helpers/bcrypt');
const { signToken, verifyToken } = require('../helpers/jwt');
const { User, Menu } = require('../models')
// const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken')
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class adminController {

    static async registerAdmin(req, res, next) {
        console.log(req.body);
        const { username,
            email,
            password,
            phoneNumber,
            address } = req.body
        try {
            const userCreated = await User.create({
                username,
                email,
                password,
                role: 'admin',
                phoneNumber,
                address
            })
            res.status(201).json({
                id: userCreated.id,
                username: userCreated.email
            })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
    static async loginAdmin(req, res, next) {
        console.log(req.body);
        const { email, password } = req.body

        try {
            const user = await User.findOne({
                where: {
                    email,
                    role: 'admin'
                }
            })
            if (!user) throw { name: 'InvalidLogin' }
            // console.log(user);

            const isValidPassword = comparePassword(password, user.password)
            if (!isValidPassword) throw { name: 'InvalidLogin' }

            const accessToken = signToken({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role  //-----Tambahin Role
            })

            res.status(201).json({
                access_token: accessToken,
                id: user.id,
                username: user.username
            })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
    static async getMenus(req, res, next) {
        try {
            let menus = await Menu.findAll()
            res.status(200).json(menus)
        } catch (err) {
            next(err)

        }
    }
    static async addMenu(req, res, next) {
        const { name, imageUrl, sides, price } = req.body
        console.log(req.body);
        try {
            let menu = await Menu.create({ name, imageUrl, sides, price })
            res.status(201).json(menu)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
    static async editMenu(req, res, next) {
        const { id } = req.params
        const { name, imageUrl, sides, price } = req.body
        console.log(req.body);
        try {
            let menu = await Menu.update({ name, imageUrl, sides, price }, {
                where: { id: id }
            })
            res.status(201).json(menu)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
    static async deleteMenu(req, res, next) {
        const { id } = req.params
        try {
            let destroy = await Menu.destroy({
                where: {
                    id: id
                }
            })
            res.status(201).json({
                message: destroy
            })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = adminController