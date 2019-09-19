var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql= require('mysql');
var cors = require("cors");

 var corsOption = {
     origin: "http://localhost:4200", //angular wala local host
     optionsSuccessStatus: 200
 }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors(corsOption));

// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db',
 //   socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});
// connect to database
dbConn.connect(); 


// powers routes//
//view all powers
app.get("/powers", function(req,res){

    dbConn.query("SELECT * from powers", function(err, results){
        if(err){
            console.log("Cant fetch powers");
        }
        else {
            res.send(results);
        }
    });
});
 
//add a new power
app.post("/powers", function (req, res) {
    var power = {
        name: req.body.name,
        id : req.body.id
    };
    if (!power) {
        return res.status(400).send({ error: true, message: 'please provide power' });
    }
    dbConn.query(`INSERT INTO powers (id,name) values('${power.id}','${power.name}')`, function (error, results) {
        if (error) { throw err }
        else {
            return res.send({data : results , message: "Added new power successfully" });
        }
    })
});



app.delete('/power/:id', function (req, res) {
    var id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide power_id' });
    }
    dbConn.query('DELETE FROM powers WHERE id = ?', [id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Power has been deleted successfully.' });
    });
});










// heroes routes

app.get('/heroes', (req, res) => {
    dbConn.query("SELECT * from heroes", function (err, results) {
        if (err) {
            console.log("can't fetch heroes")
        }
        else {
            res.send(results)
        }
    })
});

app.get("/heroes/:id", function (req, res) {
    let hero_id = req.params.id;
    if (!hero_id) {
        return res.status(400).send({ error: true, message: 'Please provide Hero Id' });
    }
    dbConn.query('SELECT * FROM heroes where id=?', hero_id, function (err, result) {
        if (err) throw err;
        return res.send(result[0]);
    });
});

app.post("/heroes", function (req, res) {
    var hero = {
        name: req.body.name,
        id : req.body.id,
        powers: req.body.powers
    };
    if (!hero) {
        return res.status(400).send({ error: true, message: 'please provide user' });
    }
    dbConn.query(`INSERT INTO heroes (id,name,powers) values('${hero.id}','${hero.name}', '${hero.powers}')`, function (error, results) {
        if (error) { throw err }
        else {
            return res.send({data : results , message: "Added new user successfully" });
        }
    })
})

app.put('/hero/:id', function (req, res) {
    var hero = {
        name: req.body.name,
        id : req.body.id
    };
    if (!hero) {
        return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
    }
    dbConn.query("UPDATE heroes SET name = ? WHERE id = ?" , [hero.name,hero.id] , function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    });
});

app.delete('/hero/:id', function (req, res) {
    var id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('DELETE FROM heroes WHERE id = ?', [id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been deleted successfully.' });
    });
});

app.get("heroes/?name=:term", function (req, res) {
    let term = req.params.id;
    if (!term) {
        return res.status(400).send({ error: true, message: 'Please provide Hero Id' });
    }
    dbConn.query('SELECT * FROM heroes where name=?', term, function (err, result) {
        if (err) throw err;
        return res.send(result[0]);
    });
});


 // set port
 app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

module.exports = app;