const mongoose = require('mongoose')
const User = require('../models/User')


module.exports = {

    async private(req, res){
        const id = req.params.id

        let nome = "Pedro"

        cons



        const user = await User.findById(id, '-password')

        if(!user){
            return res.status(404).json({msg: "User not found"})
        }

        res.status(200).json({user})
    }

}