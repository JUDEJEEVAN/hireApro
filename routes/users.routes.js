const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const router = express.Router()

// get all users
router.get('/', async (req, res) => {

    console.log(new Date(), 'request incoming to - user', req.route.stack[0].method, req.route.path)

    const users = await User.find()
    if (users) {
        return res.status(200).json({ message: 'success', users: users })
    }

    return res.status(500).json({ message: 'error' });
})

// get a specific user
router.get('/:id', async (req, res) => {

    console.log(new Date(), 'request incoming to - user', req.route.stack[0].method, req.route.path)

    const id = req.params.id
    const user = await User.findById(id)

    if (user) {
        return res.status(200).json({ message: 'success', data: user })
    }

    return res.status(404).json({ message: 'user not found' })

})

// create a user
router.post('/', async (req, res) => {

    console.log(new Date(), 'request incoming to - user', req.route.stack[0].method, req.route.path)

    // const exist = User.findOne({ name: req.body.name })
    // if (exist) return res.status(409).json({ message: 'user already exists' })

    const password = await bcrypt.hash(req.body.password, 10)

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: password
    })

    if (user) return res.status(201).json({ message: 'successfully created the user' })

    return res.status(500).json({ message: 'some error occured' })

})

// update a user
router.patch('/', async (req, res) => {

    console.log(new Date(), 'request incoming to - user', req.route.stack[0].method, req.route.path)

    const id = req.body.id
    const data = req.body

    if (req.body.password) {
        data.password = await bcrypt.hash(req.body.password, 10)
    }

    const user = await User.findByIdAndUpdate(id, data, {
        new: true
    })

    if (user) {
        return res.status(200).json({ message: 'successfully updated!' })
    } else {
        return res.status(500).json({ message: 'update failed', error: error })
    }

})

// delete a user
router.delete('/', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.body.id)
    } catch (error) {
        res.status(500).json({ message: 'error deleting the user', error: error })
    }

    res.status(200).json({ message: 'user deleted' })
})

module.exports = router