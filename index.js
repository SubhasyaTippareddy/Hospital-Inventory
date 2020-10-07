var express = require('express');
var app = express();
const BodyParser=require('body-parser');
app.use(BodyParser.urlencoded({extended:true}));
app.use(BodyParser.json());
const MongoC=require('mongodb').MongoClient;
let server = require('./server');
let middleware = require('./middleware');

console.log("Start");
const url = 'mongodb://localhost:27017';
const dbName = 'hospitalManagement';
//Fetches Hospital Details
app.get('/hospitals', middleware.checkToken,(req,res)=>{
  MongoC.connect(url,{ useUnifiedTopology: true}, (err,client)=>{
    if(!err){
      const db=client.db(dbName);
      const col1=db.collection("Hospitals");
      var name=req.query.hname;
      var query1;
      if(name===undefined) //if no query is given, all the documents are returned
         query1={};
      else
         query1={hname:name};  //else, only the documents satisfying the condition are returned 
      col1.find(query1).toArray((err,docs)=>{
        if(!err){
          res.send(docs); 
          console.log("Hospital Details fetched.");
        }
      });
    }
  });
});
//Gets Ventilator details
app.get('/ventilators',middleware.checkToken,(req,res)=>{
  MongoC.connect(url,{ useUnifiedTopology: true }, function(err, client) {
    if(err) {console.log(err); }
    else{
      const db=client.db(dbName);
      const col2= db.collection("Ventilators");
      var stat=req.body.status;
      var name=req.body.hname;
      var query2;
      if(name===undefined && stat!==undefined){
        query2={status:stat}
      }
      else if(name!==undefined && stat===undefined){
        query2={hname:name};
      } 
      else if(name!==undefined && stat!==undefined){
        query2={status:stat,hname:name};
      } 
      else{
        query2={};
      } 
      console.log(query2);
      col2.find(query2).toArray(function(err,docs){
          if(err){ console.log(err);}
          else{
            res.send(docs);
            console.log("Ventilator Details fetched.");
          }
      });  
    }
  });
});
//To Update the status of a ventilator
app.patch('/ventilators',middleware.checkToken,(req,res)=>{
  var id=req.body.vid;
  var stat=req.body.status;
  MongoC.connect(url,{ useUnifiedTopology: true }, function(err, client) {
    if(err) {console.log(err); }
    else{
      const db=client.db(dbName);
      const col2= db.collection("Ventilators");
      let k=0;
      col2.countDocuments({vid:id},(err,result)=>{
        if(result>0){
          col2.updateOne({vid:id},{$set:{status:stat}});
          var query={vid: id};
          col2.find(query).toArray((err,doc)=>{
            if(!err)
              res.send("Ventilator "+id+" is updated.");
          });
        }
        else{
          res.send("Ventilator not available, status cannot be updated.")
        }
      });
    }
  });
});
//To delete a ventilator
app.delete('/ventilators',middleware.checkToken,(req,res)=>{
  var id=req.body.vid;
  MongoC.connect(url,{ useUnifiedTopology: true }, function(err, client) {
    if(err) console.log(err); 
    else{
      const db=client.db(dbName);
      const col2= db.collection("Ventilators");
      col2.countDocuments({vid:id},(err,result)=>{
        if(result>0){
          col2.deleteOne({vid:id});
          res.send("Ventilator with id "+id+" is deleted.");
        }
        else{
          res.send("Ventilator not available, cannot be deleted.")
        }
      });
    }
    })    
})
//To add a new ventilator
app.post('/ventilators',middleware.checkToken,(req,res)=>{
  MongoC.connect(url,{ useUnifiedTopology: true }, function(err, client) {
    if(err) {console.log(err); }
    else{
      const db=client.db(dbName);
      var v=req.body.vid;
      const col2= db.collection("Ventilators");
      col2.countDocuments({vid:v},(err,result)=>{
        if(result==0){
          col2.insertOne({hid:req.body.hid,vid:v,status:req.body.status,hname:req.body.hname});
          res.send("New Ventilator is added.")
        }
        else{
          res.send("Ventilator already present, cannot have 2 ventilators with same ID.")
        }
      })  
    }
  });
})

app.listen(3000);

