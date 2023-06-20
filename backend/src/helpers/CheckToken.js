const jwt = require('jsonwebtoken')


 const checkToken = function(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({msg: "Acess blocked"})
    }

    try {
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()
        
    } catch (error) {
        return res.status(400).json({msg: 'Invalid toekn', error})
        
    }
}

module.exports = checkToken

