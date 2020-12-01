const { response } = require('express');
const express = require('express');
const { request } = require('http');
const bodyParsel = require('body-parser');
const { default: Axios } = require('axios');
const { error } = require('console');
const app = express();
app.use(bodyParsel.urlencoded({extended: true}));

app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html');
    //response.send("<h1>Hello World!</h1>");
})

app.get('/about', (request, response)=>{
    response.send("Dimitri says privet!");
})

app.get('/contact', (request, response)=>{
    response.send("Dimitri Number: 5593950189 ");
});

app.post('/', (request, response)=>{
    let userChoice = request.body.currency;
    console.log(userChoice);

Axios.get('https://api.coindesk.com/v1/bpi/currentprice/eur.json')
    .then(res => {
    
    let eur = res.data.bpi.EUR.rate;
    let usd = res.data.bpi.USD.rate;
    console.log('EUR', eur);
    console.log('USD', usd);
    let message = '';

    if(userChoice === 'EUR'){
        message = 'EUR'+ eur;
    } else {
        message = 'USD'+ usd;
    }
    response.send(message);
    })
});
app.listen(3000, () =>{
    console.log('Server is runningon port 3000');
})