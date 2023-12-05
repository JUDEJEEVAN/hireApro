const express = require('express')
const Category = require('../models/category')

const router = express.Router()

// get all categories
// onSuccess 200 onFailure 404
router.get('/', async (req, res) => {

    console.log(new Date(), 'request incoming to - category', req.route.stack[0].method, req.route.path)

    const categories = await Category.find();

    if (categories) {
        return res.status(200).json({ message: 'success', categories: categories })
    }

    return res.status(404).json({ message: 'no categories found' })

})

// create a category    
// onSuccess 201 onAlreadyExist 409 onFailure
router.post('/', async (req, res) => {

    console.log(new Date(), 'request incoming to - category', req.route.stack[0].method, req.route.path)

    const exist = Category.findOne({ name: req.body.name })
    if (exist) return res.status(409).json({ message: 'category already exists' })

    const category = await Category.create({
        name: req.body.name,
        description: req.body.description,
    })

    if (category) return res.status(201).json({ message: 'successfully created the category' })

    return res.status(500).json({ message: 'some error occured' })
})

// update a category
router.patch('/', async (req, res) => {

    console.log(new Date(), 'request incoming to - category', req.route.stack[0].method, req.route.path)

    const id = req.body.id
    const data = req.body

    try {

        const category = await Category.findByIdAndUpdate(id, data, {
            new: true
        })

    } catch (error) {

        return res.status(500).json({ message: 'update failed', error: error })

    }

    if (category) return res.status(200).json({ message: 'successfully updated!' })

})

// delete a category
router.delete('/', async (req, res) => {

    console.log(new Date(), 'request incoming to - category', req.route.stack[0].method, req.route.path)

    try {

        await Category.findByIdAndDelete(req.body.id)

    } catch (error) {

        return res.status(500).json({ message: 'failed to delete the category', error: error })

    }

    return res.status(200).json({ message: 'successfully deleted the category' })
})

module.exports = router