const { Op } = require('sequelize');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken, verifyToken } = require('../helpers/jwt');
const { User, Menu, Transaction } = require('../models')
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios')
const midtransClient = require('midtrans-client');
const { transporter } = require('../configMail');

class customerController {

    static async registerCustomer(req, res, next) {
        console.log(req.body);
        const { username, email, password, phoneNumber, address } = req.body
        try {
            const userCreated = await User.create({
                username,
                email,
                password,
                role: 'customer',
                phoneNumber,
                address
            })
            res.status(201).json({
                id: userCreated.id,
                email: userCreated.email
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async loginCustomer(req, res, next) {
        console.log(req.body);
        const { email, password } = req.body

        try {
            const user = await User.findOne({ where: { email } })
            if (!user) throw { name: 'InvalidLogin' }
            // console.log(user, '<<<<<<<<<<<');

            const isValidPassword = comparePassword(password, user.password)
            if (!isValidPassword) throw { name: 'InvalidLogin' }

            const accessToken = signToken({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            })

            res.status(200).json({
                access_token: accessToken,
                id: user.id,
                username: user.username
            })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async googleLoginCustomer(req, res, next) {
        try {
            // console.log(req.headers.google_token);

            const { google_token } = req.headers

            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];

            // console.log(payload);
            let [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    username: payload.given_name,
                    email: payload.email,
                    password: 'test-password',
                    role: 'customer'
                },
                hooks: false
            })
            const username = payload.given_name
            const id = user.id
            const access_token = signToken({
                id: user.id,
                email: user.email
            })
            res.status(200).json({ access_token, username, id })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async detailMenuCustomer(req, res, next) {
        const { menuId } = req.params
        try {
            console.log(menuId, '<<<<<<<<< MASOK SINI');
            const menu = await Menu.findByPk(menuId)
            res.status(200).json(menu)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getMenusCustomer(req, res, next) {
        try {
            const menus = await Menu.findAll()
            res.status(200).json(menus)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getCustomerTransaction(req, res, next) {
        const userLogin = req.user
        try {
            const transaction = await Transaction.findAll({
                where: { UserId: userLogin.id },
                include: [User, Menu]
            })

            res.status(200).json(transaction)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async midtransPayment(req, res, next) {
        try {
            const { transactionId } = req.params
            console.log(process.env.MIDTRANS_SERVER_KEY, '<<<<<<<<<<<');
            const findUser = await User.findByPk(req.user.id)

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: "SB-Mid-server-2vkq87qonC2P6ngIEOuTKbds"
            });

            const transaction = await Transaction.findByPk(transactionId, {
                include: [Menu]
            })

            let parameter = {
                transaction_details: {
                    order_id: "TRANSACTION" + Math.floor(1000000 + Math.random() * 900000),
                    gross_amount: transaction.Menu.price
                },
                credit_card: {
                    secure: true
                },
                customer_details: {
                    // "first_name": "budi",
                    // "last_name": "pratama",
                    email: findUser.email,
                    // "phone": "08111222333"
                }
            };
            const midTransToken = await snap.createTransaction(parameter)
            console.log(midTransToken);
            res.status(201).json(midTransToken)
        } catch (error) {
            console.log(error);
        }
    }

    static async createTransaction(req, res, next) {
        const { menuId } = req.params
        const userLogin = req.user
        try {
            const newTransaction = {
                UserId: userLogin.id,
                MenuId: menuId,
                status: 'Unpaid'
            }

            const findUser = await User.findByPk(userLogin.id)

            const findMenu = await Menu.findByPk(menuId)

            const transaction = await Transaction.create(newTransaction)

            const mailOptions = {
                from: 'dimas.ashar1997@gmail.com',
                to: findUser.email,
                subject: 'Your Order Confirmation',
                text: `
Dear ${findUser.email},

We wanted to let you know that we've received your order for ${findMenu.name}. Thank you for choosing us!

Order Details:
Product: ${findMenu.name}
Price: ${findMenu.price}

Our team is working hard to process your order. You will receive a follow-up email with shipping and delivery details once your order is ready to be dispatched.

If you have any questions or need further assistance, feel free to reach out to our customer support.

Thank you for shopping with us!

Best regards,
Stevia Kitchen`,
            };

            try {
                // Send the email aaa
                const info = await transporter.sendMail(mailOptions);
                console.log('Email sent: ' + info.response);

                res.status(201).json({ message: 'Success create your transaction' });
            } catch (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ error: 'An error occurred while sending the email.' });
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async changeStatusPayment(req, res, next) {
        const { transactionId } = req.params
        try {
            const findTransaction = await Transaction.findByPk(transactionId);

            if (!findTransaction) throw { name: "NotFound" };

            const changeStatus = await Transaction.update(
                { status: "Paid" },
                { where: { id: transactionId } }
            );

            res.status(200).json({
                message: `Transaction with id ${transactionId} has been updated`,
            });

        } catch (error) {
            console.log(error);
        }
    }

    static async deleteTransaction(req, res, next) {
        const { transactionId } = req.params
        try {
            let destroy = await Transaction.destroy({
                where: {
                    id: transactionId
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

module.exports = customerController