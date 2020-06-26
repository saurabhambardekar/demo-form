var mysql = require('mysql')
var con = mysql.createConnection({
    host: "localhost",
    user: "saurabh",
    password: "saurabh",
    database: "entry"
})
con.connect((err)=>{
    if (err) throw err;
    console.log("Connected to Database")
    var sql = "CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), sex VARCHAR(255), typeofproduct VARCHAR(255))"
    con.query(sql,(err,res)=>{
        if (err) throw err;
        console.log("Table Created")
    })
})
    