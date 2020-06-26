var express = require("express")
var cor = require("cors")
var mysql = require("mysql")
var app = express();
var router = require("express").Router()

const connection = mysql.createConnection({
    host: "localhost",
    user: "saurabh",
    password: "saurabh",
    database: "entry"
})
connection.connect(err=>{
    if (err) throw err;
    console.log("Database connected")
})
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin','*'); //http://localhost:3000,
	res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT,PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers','*');
	res.setHeader('Access-Control-Allow-Credentials','true');
	next();
});
app.get('/users',(req,res)=>{
    connection.query("SELECT * FROM users",(err,results)=>{
        if (err){
            return res.send(err);
        }else{  
            return res.json(results)
        }
    })
})  
router.route("/users/add").post((req,res)=>{
    
    console.log(req.query)
    const INSERT_INTO_USERS = `INSERT INTO users (name,sex,typeofproduct) VALUES (${req.query.name},${req.query.sex},${req.query.typeofproduct})`
    connection.query(INSERT_INTO_USERS, (err,results)=>{
        if (err) {
            res.send(err)
        }
        else{
            console.log(results)
        }
    })
})
router.route("/users/edit").post((req,res)=>{
    const {id,name,sex,typeofproduct} = req.query
    const EDIT_USERS = `UPDATE users SET name=${name},sex=${sex},typeofproduct=${typeofproduct} WHERE id=${id}`
    connection.query(EDIT_USERS,(err,results)=>{
        if(err){
            res.send(err)
        }
    })
})
router.route("/users/delete").post((req,res)=>{
    const {id} = req.query
    const DELETE_USER = `DELETE FROM users WHERE id = ${id}`
    connection.query(DELETE_USER,(err,results)=>{
        if(err){
            res.send(err)
        }
    })  
    
})
app.use(cor())


app.get("/",(req,res)=>{
    res.send("Server connected")

})

app.listen(8000, ()=>{
    console.log("Port 8000 active")
})