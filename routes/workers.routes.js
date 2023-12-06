const express = require('express')
const Worker = require('../models/Worker')

const router = express.Router()

// get all workers
router.get('/', async (req, res) => {

    console.log(new Date(), 'request incoming to - worker', req.route.stack[0].method, req.route.path)

    const workers = await Worker.find()
    if (workers) {
        return res.status(200).json({ message: 'success', workers: workers })
    }

    return res.status(500).json({ message: 'error' });
})

// get a specific worker
router.get('/:id', async (req, res) => {

    console.log(new Date(), 'request incoming to - worker', req.route.stack[0].method, req.route.path)

    const id = req.params.id
    const worker = await Worker.findById(id)

    if (worker) {
        return res.status(200).json({ message: 'success', data: worker })
    }

    return res.status(404).json({ message: 'worker not found' })

})

// create a worker
router.post('/', async (req, res) => {

    console.log(new Date(), 'request incoming to - worker', req.route.stack[0].method, req.route.path)

    const exist = Worker.findOne({ name: req.body.name })
    if (exist) return res.status(409).json({ message: 'worker already exists' })

    const worker = await Worker.create({
        name: req.body.name,
        description: req.body.description,
    })

    if (worker) return res.status(201).json({ message: 'successfully created the worker' })

    return res.status(500).json({ message: 'some error occured' })

})

// update a worker
router.patch('/', async (req, res) => {

    console.log(new Date(), 'request incoming to - worker', req.route.stack[0].method, req.route.path)

    const id = req.body.id
    const data = req.body

    try {

        const worker = await Worker.findByIdAndUpdate(id, data, {
            new: true
        })

    } catch (error) {

        return res.status(500).json({ message: 'update failed', error: error })

    }

    if (worker) return res.status(200).json({ message: 'successfully updated!' })

})

// delete a worker
router.delete('/', async (req, res) => {
    try {
        await Worker.findByIdAndDelete(req.body.id)
    } catch (error) {
        res.status(500).json({ message: 'error deleting the worker', error: error })
    }

    res.status(200).json({ message: 'worker deleted' })
})

module.exports = router