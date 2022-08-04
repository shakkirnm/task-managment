// const { Client } = require('pg')
// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'taskManagment',
//   password: 'myPassword',
//   port: 5432,
// })
// client.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });



const Pool = require('pg').Pool;

const pool = new Pool({
    user : "postgres",
    password : "myPassword",
    database : "taskmanagment",
    host : "localhost",
    port : 5432
})

pool.connect(function (err) {
  if(err) throw err;
  console.log("database connected");
})

module.exports = pool ;  