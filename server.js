const express = require('express')
const app = express()
const mysql2 = require('mysql2');
const dotenv = require('dotenv');

// config
dotenv.config();

//  create a connnection
const db = mysql.createConnection(
    {
        host: Process.env.DB_HOST,
        user: Process.env.DB_USER,
        password: Process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);


// test connection
db.connect((err) => {
    // No wedding today
    if(err) {
        return console.log("Error connectin to the mqsql database", err)
    }
    // yes weding connect
    console.log("connected to mysql successfully as id: ", db.threadId)
})




app.get('', (req, res) =>{
    const getPatients = "SELECT * FROM patients"
    db.query(getPatients, (err, data) => {
        // if i have error
        if(err){
            return res.status(400).send("failed to get patients", err)
        }

        // no error
        res.status(200).send(data)
    })
})



const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})