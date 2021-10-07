const express=require('express')
const jwt=require('jsonwebtoken')

const router = express.Router()
const User= require('../models/user')
const mongoose = require('mongoose')
const db="mongodb+srv://mock_monk:1234567890@cluster0.66270.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(db, err=>{
    if(err){
        console.error('Error!'+ err)
    }
    else{
        console.log('Connected to mongoDB')
    }
})

function verifyToken(req, res, next)
{
    if(!req.headers.authorization)
    {
        return res.status(401).send('unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token==='null')
    {
        return res.status(401).send('unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload)
    {
        return res.status(401).send('unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req,res)=>{
    res.send('From api route')
})

router.post('/register', (req,res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser)=>{
        if(error){
            console.log(error)
        }
        else{
            let payload={subject:registeredUser._id}
            let token = jwt.sign(payload, 'secreteKey')
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req,res)=>{
    let userData=req.body
    User.findOne({email:userData.email},(error, user)=>{
        if(error){
            console.log(error)
        }
        else{
            if(!user){
                res.status(401).send('Invalid Email')
            }
            else{
                if(user.password !== userData.password)
                {
                    res.status(401).send('Invalid password')
                }
                else{
                    let payload={subject:user._id}
                    let token = jwt.sign(payload, 'secreteKey')
                    res.status(200).send({token})
                }
            }
        }

    })
})

router.get('/events', (req,res)=>{
    let events=[
        {
            "_id":"1",
            "name": "Auto Expo",
            "description":"lorem ipsum",
            "date": "29/07/2021"
        },
        {
            "_id":"2",
            "name": "Edu Expo",
            "description":"lorem ipsum",
            "date": "30/07/2021"
        },
        {
            "_id":"3",
            "name": "Job Expo",
            "description":"lorem ipsum",
            "date": "28/07/2021"
        },
        {
            "_id":"4",
            "name": "Stone Expo",
            "description":"lorem ipsum",
            "date": "31/07/2021"
        }]
        res.json(events)
})


router.get('/special-events', verifyToken, (req,res)=>{
    let events=[
        {
            "_id":"1",
            "name": "Auto Expo meeting",
            "description":"lorem ipsum",
            "date": "29/08/2021"
        },
        {
            "_id":"2",
            "name": "Edu Expo meeting",
            "description":"lorem ipsum",
            "date": "30/08/2021"
        },
        {
            "_id":"3",
            "name": "Job Expo meeting",
            "description":"lorem ipsum",
            "date": "28/08/2021"
        },
        {
            "_id":"4",
            "name": "Stone Expo meeting",
            "description":"lorem ipsum",
            "date": "31/08/2021"
        }]
        res.json(events)
})

module.exports=router