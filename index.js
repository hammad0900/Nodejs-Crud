const  mysql = require('mysql')
const express = require('express')
const app = express()
const body_parser = require('body-parser')
app.use(body_parser.json())
const connection= mysql.createConnection({
    host:'localhost',
    user :'root',
    password:'',
    database:'EmployeeDB',
    multipleStatements = true
});
connection.connect((err)=>{
    if(err) throw err
    console.log("Connected to database")
})

app.listen(3000,()=>console.log("Server is listening on port number 3000"))
//Get all employees
app.get('/employee',(request,response)=>{
    const query = 'SELECT * FROM EMPLOYEE'
    connection.query(query,(err,rows,fields)=>{
    if(!err)
    response.send(rows)
    else
    console.log(err)
    })
})
//Retrieve particular Employee
app.get('/employee/:id',(request,response)=>{
    const query = 'SELECT * FROM EMPLOYEE WHERE EmpID = ?'
    connection.query(query,[request.params.id],(err,rows,fields)=>{
    if(!err)
    response.send(rows)
    else
    console.log(err)
    })
})
//Delete an Employee
app.delete('/employee/:id',(request,response)=>{
    const query = 'DELETE  FROM EMPLOYEE WHERE EmpID = ?'
    connection.query(query,[request.params.id],(err,rows,fields)=>{
        if(!err)
        response.send('Deleted Successfully')
        else
        console.log(err)
    })

})

//Insert an employees
app.post('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].EmpID);
            });
        else
            console.log(err);
    })
});

//Update an employees
app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});

