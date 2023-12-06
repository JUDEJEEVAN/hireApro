const express = require('express')
const Project = require('../models/project')

const router = express.Router()

// get all projects
router.get('/', async (req, res) => {

    console.log(new Date(), 'request incoming to - project', req.route.stack[0].method, req.route.path)

    const projects = await Project.find()
    if (projects) {
        return res.status(200).json({ message: 'success', projects: projects })
    }

    return res.status(500).json({ message: 'error' });
})

// get a specific project
router.get('/:id', async (req, res) => {

    console.log(new Date(), 'request incoming to - project', req.route.stack[0].method, req.route.path)

    const id = req.params.id
    const project = await Project.findById(id)

    if (project) {
        return res.status(200).json({ message: 'success', data: project })
    }

    return res.status(404).json({ message: 'project not found' })

})

// create a project
router.post('/', async (req, res) => {

    console.log(new Date(), 'request incoming to - project', req.route.stack[0].method, req.route.path)

    const exist = Project.findOne({ name: req.body.name })
    if (exist) return res.status(409).json({ message: 'project already exists' })

    const project = await Project.create({
        name: req.body.name,
        description: req.body.description,
    })

    if (project) return res.status(201).json({ message: 'successfully created the project' })

    return res.status(500).json({ message: 'some error occured' })

})

// update a project
router.patch('/', async (req, res) => {

    console.log(new Date(), 'request incoming to - project', req.route.stack[0].method, req.route.path)

    const id = req.body.id
    const data = req.body

    try {

        const project = await Project.findByIdAndUpdate(id, data, {
            new: true
        })

    } catch (error) {

        return res.status(500).json({ message: 'update failed', error: error })

    }

    if (project) return res.status(200).json({ message: 'successfully updated!' })

})

// delete a project
router.delete('/', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.body.id)
    } catch (error) {
        res.status(500).json({ message: 'error deleting the project', error: error })
    }

    res.status(200).json({ message: 'project deleted' })
})

module.exports = router