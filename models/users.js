const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'please enter a name']
        },

        phonenum: {
            type: Number,
            required: true,
            default: 0
        },

        age: {
            type: Number,
            required: false,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("users", UsersSchema);
module.exports = User;