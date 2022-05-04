const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const internSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    email: {
        unique: true,
        required: true,
        type: String,
        lowercase:true
    },
    mobile: {
        unique: true,
        required: true,
        type: String
    },
    collegeId: {
        type: ObjectId,
        ref: 'College'
    },


    isDeleted: {
        type: Boolean, default: false
    }

})




module.exports = mongoose.model('Intern', internSchema) 