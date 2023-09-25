const axios = require('axios');
const express = require('express');
const app = express();
let port = 8080;

let array = [];

function ApiGet() {
axios.get('http://api.nbp.pl/api/exchangerates/tables/A/')
.then(res => {
    var data = res.data[0];
    array = [];
    data.rates.forEach(element => {
        if(element.code == 'USD' || element.code == 'EUR' || element.code == 'GBP') {
            array.push(element);
        }
    });
    console.log(array);
})
.catch(e => {
    console.log(e);
}); 
};
ApiGet();
setInterval(ApiGet, 300000);

app.get('/dolar', (req, res) => {
    res.json( array[0].mid );
});
app.get('/euro', (req, res) => {
    res.json( array[1].mid );
});
app.get('/funt', (req, res) => {
    res.json( array[2].mid );
});

app.listen(port, () => {
    console.log('Running on:' + port)
});