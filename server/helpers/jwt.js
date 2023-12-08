const jwt = require('jsonwebtoken');
const SECRET = 'SECRET'

const signToken = (payload)=>{
    return jwt.sign(payload, SECRET)
}
const verifyToken = (access_token)=>{
    return jwt.verify(access_token, SECRET)
}

module.exports = {signToken, verifyToken}