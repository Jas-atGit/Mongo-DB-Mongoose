const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./blog.js')
const dotenv = require('dotenv');

dotenv.config();

const app = express()


const dbURI = process.env.DB



//required parameters
mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => console.log('Connected')) //optional
    .catch((err) => console.log(err))

//home page
app.get('/', (req, res) => {
    res.send('Helo world')
})


//for adding data to mongodb 
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: "try blog 2",
        description: "this is some blog description mongo db"
    })
    blog.save()
        .then((result) => res.json(result))
        .catch((err) => console.log(err))
})

//for getting all blogs
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => res.json(result))
        .catch((err) => console.log(err))
})

app.listen(5000, () => {
    console.log(`listeninig to port 5000`);

});