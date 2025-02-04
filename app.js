const express = require('express')
// const path = require('path') 
const app = express()
const store  = require('./routers/store')
const {host} = require('./routers/host')
const rootdir = require('./utils/path')
const path = require('./utils/path')
const pathe = require('path')
app.use(express.urlencoded())
app.use(store);  
app.use(host);  
app.set('view engine','ejs')
app.set('views','views')
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(express.static(pathe.join(__dirname,'public')))


app.use((req,res,next)=>{
    res.status(404).render('404');
})
const port =3000;
app.listen(port , ()=>{
    console.log(`aerver is running http://localhost${port}`)
})