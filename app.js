const facts = require('./facts.json')


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


// Greeting Function
// http://localhost:3000/greet?name=kaylee&year=2002
app.get('/greet', (req, res) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - req.query.year;
    res.send(`Hello, ${req.query.name}! You are ${age} or ${age - 1} years old.`);
});

//  Math Operations 
// http://localhost:3000/math/5/add/3
app.get('/math/:num1/:op/:num2', (req, res) => {
    const num1 = parseInt(req.params.num1);
    const num2 = parseInt(req.params.num2);
    let result;

    switch(req.params.op) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            result = num1 / num2;
            break;
        default:
            result = 'Invalid operation';
    }

    res.send(`${result}`);
});

// Pandora's Box Function (Random Dad Joke or Random Fact)
// http://localhost:3000/pandorasbox (then reload the page to see the random fact or dad joke)

app.get('/pandorasbox', (req, res) => {
    const choice = Math.floor(Math.random() * 2); // Randomly generates 0 or 1

    if (choice === 0) {
        // Fetch a dad joke
        fetch("https://icanhazdadjoke.com/", { 
            headers: {
                "Accept": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            res.render('pandorasbox', { title: "Pandora's Box", message: data.joke });
        });
    } else {
        // Pick a random fact from facts.json
        const randomIndex = Math.floor(Math.random() * facts.length);
        const fact = facts[randomIndex].fact;
        res.render('pandorasbox', { title: "Pandora's Box", message: fact });
    }
});
