const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = {

    async register(req, res) {
        const {name, email, password, confirmpassword} = req.body

        if(!name || !email || !password || !confirmpassword) {
            return res.status(422).json({msg: "Check your data  "})
        }

        const userExist = await User.findOne({email: email})

        if(userExist){
            return res.status(422).json({msg: "Try another email"})
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            password: passwordHash
        })

        try {

            await user.save()
            res.status(201).json({msg: "Ohh Yeah!! Welcome!"})
            
        } catch (error) {
            res.status(500).json({msg: "Error in server"})
            
        }

 
    }


}