const mongoose = require('mongoose')

const Schema = mongoose.Schema

const WorkerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    hourly_rate: {
        type: Number, 
        required: true,
    }
}, 
{
    timestamps: true
}
)

const Worker = mongoose.model('Worker', WorkerSchema)

module.exports = Worker