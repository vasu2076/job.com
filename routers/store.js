const express = require("express");
const Job = require("../models/home");
const path = require("path");
const rootdir = require("../utils/path");
const Apply = require("../models/apply"); // Renamed to avoid confusion
const { error } = require("console");
const user = require("../models/singup")
const store = express.Router();
const fs = require('fs');
const { data } = require("autoprefixer");

store.get('/',(req,res,next)=>{
    res.render("loging")  // First response sent

})


store.post('/', (req, res, next) => {
    const filePath = path.join(rootdir, 'data', 'user.json');

    fs.readFile(filePath, "utf8", (err, data) => {

        let users = [];
            users = JSON.parse(data);

        const { name, password } = req.body;
        // console.log("Received Name:", req.body.name);
// console.log("Received Password:", req.body.password);
// console.log("Full req.body:", req.body);

        const foundUser = users.find(user => user.name === name);
        // console.log("Users in JSON:", users);
// console.log("Found User:", foundUser);


        if (!foundUser) {
            return res.send(`<script>alert("User not found! Please sign up first.");s</script>`);
        }

        if (foundUser.password !== password) {
            return res.send(`<script>alert("Incorrect password! Try again.");</script>`);
        }

        res.redirect("/index");
    });
});

store.get('/singup',(req,res,next)=>{
    res.render("signup")
})

store.post('/singup',(req,res,next)=>{
    // const {name,password} = req.body
    const newuser = new user(req.body.name,req.body.password)
    console.log(newuser);
    newuser.save();
   res.redirect("/")
})

store.get("/index", (req, res, next) => {
    Job.fetchall((registeredjob) => {
        res.render("index", { registeredjob: registeredjob });
    });
});

store.get("/jobs", (req, res, next) => {
    Job.fetchall((registeredjob) => {
        res.render("job", { registeredjob: registeredjob });
    });
});

store.get("/apply", (req, res, next) => {
    Apply.getapply((appliedJobs) => {  // Changed callback parameter
        Job.fetchall((registeredjob) => {
            const applied = registeredjob.filter(Job => appliedJobs.includes(Job.id)); // Use correct variable
            res.render("apply", { applied: applied }); // Keep it as "apply" for rendering
        });
    });
});

store.post("/apply", (req, res, next) => {
    Apply.addtoapply(req.body.id, (error) => {
        if (error) {
            console.log("Error while applying:", error);
        }
        res.redirect("/apply");
    });
});

store.post("/apply/delete/:id",(req,res,next) => {
    const jobid = req.params.id;
    Apply.deleteById(jobid,error =>{
        if (error){
            console.log("erro while removing from apply",error)
        }
        res.redirect("/apply");
    })
    });


module.exports = store;
