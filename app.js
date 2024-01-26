const express = require('express')
const app = express()

const PORT = process.env.PORT || "3000"

app.set('view engine', 'ejs')

app.listen(PORT, ()=> {
    console.log( `App is running on http://localhost:${PORT}...`)
})

app.get("/", (req, res) => {

    res.send("Good Job!")

})

// http://localhost:3000/greet?name=kaylee&dob=2002
app.get('/greet', (req, res)=> {
    console.log(req.query)

    res.send(`hey, ${req.query.name}`)
})

app.get('/math/:num1/:op/:num2', (req, res)=> {
    console.log( req.params )
    res.send(`${req.params.num1}`)
})

app.get('/pandorasbox', (req, res)=> {

    // do the work
    const message = "DAD JOKE"

    res.render('pandorasbox', {title: "Pandora's Box", message} )

})