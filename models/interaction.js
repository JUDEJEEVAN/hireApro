const mongoose = require('mongoose')

const Schema = mongoose.Schema

const InteractionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    worker: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    }
}, 
{
    timestamps: true
}
)

const Interaction = mongoose.model('Interaction', InteractionSchema)

module.exports = Interaction