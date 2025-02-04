const express = require('express');
const path = require('path');
const rootdir = require('../utils/path');
const Job = require('../models/home');
const host = express.Router();

host.get('/submit-job', (req, res, next) => {
    Job.fetchall((registeredjob) => { // Ensure you pass a callback function
        res.render('addjob');
    });  
});

host.post('/submit-job', (req, res, next) => {
    const { jobname, companyname, jobdescription, location, jobtype, salary, contactemail, position } = req.body;
    const newJob = new Job(jobname, companyname, jobdescription, location, jobtype, salary, contactemail, position);
    newJob.save();
    res.render('jobadded');
});

host.get('/contact-us', (req, res, next) => {
    res.render('contact');
});

host.post('/submit-contact', (req, res, next) => {
    res.render('contactshort');
});



module.exports.host = host;
