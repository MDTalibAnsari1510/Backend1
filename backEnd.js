const db = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const { json } = require('body-parser');
app.use(bodyparser.json());
var dbConnection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'talib',
    database: 'newdb',
    multipleStatements: true
});
dbConnection.connect((err)=>{
    if(!err){
        console.log('db connection success.')
    }
    else{
        console.log("db connection failed \n Error : " + json.stringify(err,undefine,2))
    }
});

// create 
app.post('/employee',(res,req)=>{
    var emp = req.body;
    var sql = "SET @empId=?; SET @empName=?; SET @empDept=?; SET @empEmail=?;\
     Call EmployeesAddOrEdit(@empId,@firstName,@lastName,@empDept,EmpEmail);";
    dbConnection.query(sql,[emp.empId, emp.empName, emp.empDept,emp.empEmail],(err,rews,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    });
});


//read
app.get('/',(res,req)=>{
    dbConnection.query('SELECT * FROM employee',(err,rews,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    });
});

// updated
app.put('/employee',(res,req)=>{
    var emp = req.body;
    var sql = "SET @empId=?; SET @empName=?; SET @empDept=?; SET @empEmail=?;\
     Call EmployeesAddOrEdit(@empId,@firstName,@lastName,@empDept,EmpEmail);";
    dbConnection.query(sql,[emp.empId, emp.empName, emp.empDept,emp.empEmail],(err,rews,fields)=>{
        if(!err){
            res.send("updated successfully");
        }
        else{
            console.log(err);
        }
    });
});


// delete 
app.get('/',(res,req)=>{
    dbConnection.query('DELETE * FROM employee',(err,rews,fields)=>{
        if(!err){
            res.send("Delete the data successfully");
        }
        else{
            console.log(err);
        }
    });
});


app.listen(3000,"localhost",()=>{
    console.log('server ready')
});
