const express = require('express');
const fs = require('fs');
const app = express();
const cart = require('./cartRouter');//обработчик всех запросов корзины

app.use(express.json()); // Получение параметров строки POST-запроса, данные были отправлены в формате JSON
app.use('/', express.static('public')); //http://localhost:3000/index.html/ - запрос в строке браузера  public - наша директория с frontend
app.use('/api/cart', cart);	// пользовательская функция обращения к корзине


// app.get();
// app.post();
// app.put(); 
// app.delete();

app.get('/api/products', (req, res) => {
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data); // ответ сервера
        }
    })
});

// app.get('/api/cart/:id', (req, res) => {
//    // res.send(req.params.id);
//     res.send(req.query);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));