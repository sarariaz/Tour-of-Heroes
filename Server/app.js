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
        city: req.body.city
    
    };
    if (!hero) {
        return res.status(400).send({ error: true, message: 'please provide user' });
    }
    dbConn.query(`INSERT INTO heroes (id,name,city) values('${hero.id}','${hero.name}' ,'${hero.city}')`, function (error, results) {
        if (error) { throw err }
        else {
            return res.send({data : results , message: "Added new Hero successfully" });
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

//========================================================================================
// HERO POWER ROUTES
//========================================================================================


// Show the heropower table and the powers of particular hero
app.get("/heropowers/:id", function (req, res) {
    let hero_id = req.params.id;
    dbConn.query('SELECT hp.hp_id , h.name as hname , p.name FROM hero_power hp, heroes h, powers p WHERE hp.h_id = h.id AND hp.p_id = p.id AND h.id = ?', [hero_id] , function (err, result) {
        if (err) throw err;
        return res.send(result);
    });
});

//Add new powers to the Hero in HeroPower Table
app.post("/heropowers/:heroid/:powerid", function(req,res){
    var heroPower = {
        heroid  :req.params.heroid,
        powerid : req.params.powerid
    }
    if(!heroPower){
        res.send("There is incomplete information provided");

    }
    dbConn.query(`INSERT INTO hero_power (h_id, p_id) VALUES ('${heroPower.heroid}','${heroPower.powerid}')`, function(err, result){
        if(err){
            throw err;
        }
        return res.send({data : result , message : "Added new power to hero in heropower table!"});
    });
});

// To delete the Power of a Hero
app.delete('/heropowers/:id' , function(req,res){
    var id = req.params.id
    if (!id) {
        return res.send('please provide power');
    }
    dbConn.query("DELETE from hero_power where hp_id = ?" , [id] , function(error , result ) {
        if(error) throw err;
        return res.send({data : result , message : "Deleted power to hero"});
    });
});

// ======================================================================================
// COSTUMES ROUTES
// ======================================================================================

// Get all costumes

app.get("/costumes", function(req,res){
    dbConn.query(`SELECT * from costumes `, function(err, results){
        if(err){
            throw err;
        }
        res.send(results)
    });
});


// get a costume from its id
app.get("/costumes/:id", function(req,res){
    let costume_id = req.params.id;
    dbConn.query(`SELECT * FROM costumes WHERE id=?`, costume_id, function(err,result){
        if(err){
            throw err;
        }
        res.send(result[0]);
    });
});

//create a new costume
app.post("/costumes", function (req, res) {
    var costume = {
        name: req.body.name,
        id : req.body.id
    
    };
    if (!costume) {
        return res.status(400).send({ error: true, message: 'please provide costume' });
    }
    dbConn.query(`INSERT INTO costumes (id,name) values('${costume.id}','${costume.name}')`, function (error, results) {
        if (error) { throw err }
        else {
            return res.send({data : results , message: "Added new costume successfully" });
        }
    });
});

// delete a costume
app.delete("/costumes/:id",function(req,res){
    let id = req.params.id;
    dbConn.query(`DELETE FROM costumes WHERE id=? `, [id] , function(err, result){
        if(err)
        {
            throw err;
        }
        res.send(result);

    });
});

//===============================================================
// ROUTES FOR , GETTING, ADDING AND DELETING THE COSTUME OF HERO

app.get("/herocostume/:id", function(req,res){
    var id = req.params.id;
    dbConn.query(`SELECT h.costume_id , c.name  FROM costumes c, heroes h WHERE h.costume_id = c.id AND h.id = ?`, [id], function(err, results){
        if(err){
            throw err;
        }
        res.send(results);
    });

});


//Delete COSTUME FROM HERO

//we are using PUT as HTTP VERB because we want to edit/update only ONE SINGLE column, NOT the whole row.
app.put('/herocostume/:id' , function(req,res){
    var hero_id = req.params.id
   
    dbConn.query("UPDATE heroes SET costume_id = NULL WHERE id = ?" , [hero_id] , function(error , result ) {
        if(error) throw error;
        return res.send(result);
    });
});

// adding new costume to hero
app.put("/herocostume/:heroid/:costumeid", function (req, res) {
    let hero_id = req.params.heroid;
    let costume_id = req.params.costumeid;
    dbConn.query("UPDATE heroes SET costume_id = ? WHERE id = ?" , [costume_id,hero_id] , function (err, result) {
        if (err) throw err;
    return res.send(result);
});
});
 









 // set port
 app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

module.exports = app;