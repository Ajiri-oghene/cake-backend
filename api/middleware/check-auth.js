const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ');
        if (token[0] === 'Bearer' && jwt.verify(token[1], process.env.JWT_KEY)){
            next();
        }
    }
    catch (error) {
        return res.status(401).json({
            message: 'Source of error',
            // message: Auth failed
        });
    }
    
}

module.exports = auth;