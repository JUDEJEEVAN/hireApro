const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    worker: {
        type: Schema.Types.ObjectId,
        ref: 'Worker',
        required: true,
    },
    title: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, 
{
    timestamps: true
}
)

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project