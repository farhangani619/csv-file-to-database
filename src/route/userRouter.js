const express = require('express')
const router = new express.Router()

const User = require('../models/user')
const auth = require('../middleware/auth')


router.post('/signup',async(req,res)=>{
    const user = new User(req.body)
    try{
        const token = await user.generateAuthToken()
        await user.save()
        
        res.status(201).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }

})
router.get('/user',auth, async (req,res)=>{
  
    res.send(req.user)  
  
})
router.post('/login',async(req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
         res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})
router.post('/logout', auth , async(req ,res)=>{
    try{
         req.user.tokens = req.user.tokens.forEach(token => {
        return token.token !== req.token
    })
    await req.user.save()
    res.send()
}
catch(e){
    res.status(500).send()
}
   

})
router.delete('/delete',auth, async(req,res)=>{
    try{
        await req.user.remove()
        res.send(req.user)
    }
    catch(e){
        res.status(500).send()
    }
})
module.exports=router