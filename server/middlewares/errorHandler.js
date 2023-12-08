const errorHandler = (err, req, res, next) => {
    let status = 500
    let message = "Internal server error"

    switch (err.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            status = 400
            message = err.errors[0].message
            break;
        case "InvalidLogin":
            status = 401;
            message = "Invalid email or password"; 
            break;      
        case 'Unauthorized':
        case "JsonWebTokenError":
            status = 401
            message = 'Invalid token'
            break;
        case 'Forbidden':
            status = 403
            message = 'You are not authorized'
            break;
        case 'Not Found':
            status = 404
            message = 'Data not found'
            break;
        default:
            break;
    }
    res.status(status).json({message})
}

module.exports = errorHandler