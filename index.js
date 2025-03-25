const express = require('express');
const mongoose = require('mongoose')

// use a middleware for posting in json format
const app = express()
app.use(express.json());

const User = require('./models/users');

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

app.get('/', (req, res) => {
  res.send('this is response from get');
})

app.get('/api/users', async (req, res) => {
    //res.send('this is response from post');
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(error) {
        res.status(500).json({message:error.message})
    }
})

app.post('/api/users', async (req, res) => {
    //res.send('this is response from post');
    try {
        const users = await User.create(req.body);
        res.status(200).json(users);
    }
    catch(error) {
        res.status(500).json({message:error.message})
    }
})

app.put('/api/users/:id', async (req, res) => {
    //res.send('this is response from post');
    try {
        const {id} = req.params;
        const users = await User.findByIdAndUpdate(id, req.body);
        if(!users) {
            return res.status(404).json({message: "user not found"});
        }
        const updateUser = await User.findById(id);
        res.status(200).json(updateUser);
    }
    catch(error) {
        res.status(500).json({message:error.message})
    }
})

app.delete('/api/users/:id', async (req, res) => {
    //res.send('this is response from post');
    try {
        const {id} = req.params;
        const users = await User.findByIdAndDelete(id);
        if(!users) {
            return res.status(404).json({message: "user not found"});
        }
        res.status(200).json({message: "user successfully deleted"});
    }
    catch(error) {
        res.status(500).json({message:error.message})
    }
})

mongoose.connect('mongodb+srv://smkumar210:42uGjMX1px3idGDh@cluster0.akvlh.mongodb.net/CRUDAPI?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((err) => {
    console.log('Connection failed', err);
})

//app.listen(3000)