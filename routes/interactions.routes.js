const express = require('express')
const Interaction = require('../models/interaction')

const router = express.Router()

// get all interactions
router.get('/', async (req, res) => {

    console.log(new Date(), 'request incoming to - interaction', req.route.stack[0].method, req.route.path)

    const categories = await Interaction.find();

    if (categories) {
        return res.status(200).json({ message: 'success', categories: categories })
    }

    return res.status(404).json({ message: 'no categories found' })

})

// get a specific interaction
router.get('/:id', async (req, res) => {

    console.log(new Date(), 'request incoming to - interaction', req.route.stack[0].method, req.route.path)

    const id = req.params.id
    const interaction = await Interaction.findById(id)

    if (interaction) {
        return res.status(200).json({ message: 'success', data: interaction })
    }

    return res.status(404).json({ message: 'interaction not found' })

})

// create an interaction
router.post('/', async (req, res) => {

    console.log(new Date(), 'request incoming to - interaction', req.route.stack[0].method, req.route.path)

    const exist = Interaction.findOne({ name: req.body.name })
    if (exist) return res.status(409).json({ message: 'interaction already exists' })

    const interaction = await Interaction.create({
        name: req.body.name,
        description: req.body.description,
    })

    if (interaction) return res.status(201).json({ message: 'successfully created the interaction' })

    return res.status(500).json({ message: 'some error occured' })

})

// update an interaction
router.patch('/', async (req, res) => {

    console.log(new Date(), 'request incoming to - interaction', req.route.stack[0].method, req.route.path)

    const id = req.body.id
    const data = req.body

    try {

        const interaction = await Interaction.findByIdAndUpdate(id, data, {
            new: true
        })

    } catch (error) {

        return res.status(500).json({ message: 'update failed', error: error })

    }

    if (interaction) return res.status(200).json({ message: 'successfully updated!' })

})

// delete an interaction
router.delete('/', async (req, res) => {

    console.log(new Date(), 'request incoming to - interaction', req.route.stack[0].method, req.route.path)

    try {

        await Interaction.findByIdAndDelete(req.body.id)

    } catch (error) {

        return res.status(500).json({ message: 'failed to delete the interaction', error: error })

    }

    return res.status(200).json({ message: 'successfully deleted the interaction' })

})

module.exports = router