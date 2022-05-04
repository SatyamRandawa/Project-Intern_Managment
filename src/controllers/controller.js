const mongoose = require('mongoose')
const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const ObjectId = mongoose.Types.ObjectId;
const dv = /[a-zA-Z]/;   //string 
const mob = /^\d{10}$/;   //mobile
const evalid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;  // for email
const createColleges = async function (req, res) {
    try {
        let data = req.body
        // check that user sending data or not
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: 'Invalid Request !! Please Enter college Detail ' })
        }

        const { name, fullName, logoLink } = data
        // check that user is provide only string
        if ((name == 0) || !dv.test(name)) {
            return res.status(400).send({ status: false, msg: "please provide valid name of college" })
        }
        //  check if the intern is already registerd or not
        let existingCollege = await collegeModel.findOne({name})
        if (existingCollege) {
            return res.status(400).send({ status: false, msg: "college is already exist" })
        }
        if ((fullName == 0) || !dv.test(fullName)) {
            return res.status(400).send({ status: false, msg: "please provide valid Fullname of college" })
        }
        if (logoLink == 0) {
            return res.status(400).send({ status: false, msg: "please provide logoLink" })
        }
        let college = await collegeModel.create(data)
        return res.status(201).send({ msg: "Data created successfully", data: college })

    } catch (error) {
        return res.status(500).send({ err: error.message })
    }
}

const createInterns = async function (req, res) {
    try {
        let data = req.body
        // check that user sending data or not
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: 'Invalid Request !! Please Enter intern Detail ' })
        }
        
        const { name, collegeName, email,mobile, collegeId } = data
        // check that user is provide only string
        if ((name == 0) || !dv.test(name)) {
            return res.status(400).send({ status: false, msg: "please provide name of intern" })
        }
        if ((collegeName == 0) || !dv.test(collegeName)) {
            return res.status(400).send({ status: false, msg: "please provide name of college" })
        }
        // email validation using regex
        if ((email == 0) || !evalid.test(email)) {
            return res.status(400).send({ status: false, msg: "please provide a valid email" })
        }
        // checking email in database
        existingemail = await internModel.findOne({ email:email })
        if (existingemail) {
            return res.status(400).send({ msg: "email is already exist" })
        }
        // mobile validation using regex
        if ((mobile == 0) || !mob.test(mobile)) {
            return res.status(400).send({ status: false, msg: " moblie number should be of 10 digit" })
        }
        // checking mobile in database
        existingMobile = await internModel.findOne({ mobile: mobile })
        if (existingMobile) {
            return res.status(400).send({ msg: "Mobile no. is already exist" })
        }
        // check the collegeId is valid type of Id or blank
        if ((collegeId == 0) || !ObjectId.isValid(collegeId)) {
            return res.status(400).send({ status: false, msg: "please provide a valid  collegeId" })
        }
        // check te collegID is present or not
        checkCollegeId = await collegeModel.findById({ _id: collegeId })
        if (!checkCollegeId) {
            return res.status(400).send({ status: false, msg: "college id is not found" })
        }
        let intern = await internModel.create(data)
        return res.status(201).send({ msg: "intern profile is created", data: intern })
    }
    catch (err) {
        return res.status(500).send({ error: err.message })
    }
}



module.exports.createColleges = createColleges
module.exports.createInterns = createInterns

