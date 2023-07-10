const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireauth = async (req, res, next) => {
    //verify authentication
    const { authorization } = req.headers
    console.log(authorization);
    if (!authorization) {
        return res.status(401).json({error: 'Authorization token is missing'});
    }

    const token = authorization.split(' ')[1]
    
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({_id}).select('_id')
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({error:'Request is not authorized'})
    }
}

module.exports = requireauth