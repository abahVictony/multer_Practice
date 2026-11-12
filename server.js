const express = require('express');
require('dotenv').config()

const PORT = process.env.PORT || 1331;
const sequelize = require('./database/database')
const productRouter = require('./routes/productRouter')

const app = express()

app.use(express.json())
app.use(productRouter)

const dbConnect = async()=>{
try {
    await sequelize.authenticate()
    console.log('Connection to Server Established Successfully')
} catch (error) {
    console.error('Failed to connect to Database', error.message)
}
}
dbConnect()

app.listen(PORT, ()=>{
    console.log(`Server is Running on PORT ${PORT}`);
    
})