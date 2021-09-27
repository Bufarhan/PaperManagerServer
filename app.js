 
const express = require('express')
 
const sqlite3 = require('sqlite3').verbose();
const db=new sqlite3.Database("./papersDb.db",(err)=>{
    if(err)
    console.log(err);
    console.log("Connection successful");
})
 
//JUST TO MAKE THE TABLE
//db.run("drop table papers");
//db.run("Create table papers(id,title,auther,datePublished,referenceCount,numbersOfCitations)");
// db.run('insert into papers values(?,?,?,?,?,?);',
// 2,
// "Paper 2",
// "A.Bufarhan",
// "1985-12-12",
// 6,
// 88,
// (err)=>{
//    if(err)console.log(err);else
//    console.log("Added");
// })
 

const app = express()
const port = 5000
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  var cors = require('cors');
  app.use(cors());

  app.post('/addPaper', (req, res) => {
    debugger;
     db.run('insert into papers values( ?,?,?,?,?);',
     
     req.body.title,
     req.body.auther,
     req.body.datePublished,
     req.body.referenceCount,
     req.body.numbersOfCitations,
     (err)=>{
        if(err)console.log("Error");
        console.log("Added");
    })
    res.send('OK')
  })

  app.get('/getPapers', (req, res) => {
    
    db.all('select * from papers', function (err, rows) {
      if(err){
          console.log(err);
      }else{
      
        res.send(rows)
        }
    });

     


  })
   
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
