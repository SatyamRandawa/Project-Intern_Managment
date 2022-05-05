const mongoose = require('mongoose');
const validator = require('validator');

const collageSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    fullName: {
        type: String,
        required:true,
        trim: true,
    },
    logoLink: {
        type: String,
        required: true,
        validate: {
            validator: value => validator.isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
            message: 'please enter a Valid URL'
        }
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("College", collageSchema)
