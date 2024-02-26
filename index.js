require('dotenv').config();
// server code
const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000

app.use(express.json())
app.use(cors())

const productroutes = require("./Routes/products")



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
app.get('/' , (req , res)=>{
    res.send("server is ready")
})

app.use("/api/products" , productroutes)



const mongoose = require('mongoose')

const mongoosestring = process.env.DatabaseURL
mongoose.connect(mongoosestring)

const database = mongoose.connection


database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log("database connected")
})


const dataschema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    }, 
    
})


const datamodel = mongoose.model("data", dataschema, "signup")

app.post('/', async (req, res) => {

    const savedt = datamodel({
        name: req.body.name,

    });
    try {
        saved = await savedt.save()
        res.json(saved)
    }
    catch (error) {
        res.send("something went wrong")
        console.log(error)
    }
})

app.get('/:id', async (req, res) => {
    try {
        const data = await datamodel.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});


app.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body.name;
        const options = { new: true };

        const result = await datamodel.findByIdAndUpdate(
            id, updatedData,options)

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await datamodel.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})