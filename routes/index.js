const express = require('express')
const router = express.Router()
const {ensureAuth,ensureGuest} = require('../middleware/auth')
const Note = require('../models/Note')

router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{
        layout:'login'
    })
})

router.get('/dashboard',ensureAuth,async(req,res)=>{
    try{
        const notes = await Note.find({user: req.user.id }).lean()
        console.log(notes)
        res.render('dashboard',{name: req.user.firstName,notes,imgSrc: req.user.image})
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router
