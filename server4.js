var express = require('express');
var app = express();
var fs = require("fs");


app.delete('/customers/:customerId', function(req, res) {
     // First read existing users.
   fs.readFile( __dirname + "/" + "customers.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       
      
                    var transactionId = req.params.customerId * 35 + 7;
                   res.end("To confirm the transaction, use: /confirm/"+ transactionId+"");
                        fs.writeFile(__dirname + "/" + "key.json", transactionId, function (err) {
                        if (err) throw err;
                    });
       
   });
});
    
app.delete('/customers/:customerId/confirm/:transactionId', function(req, res) {
     // First read existing users.
   fs.readFile( __dirname + "/" + "customers.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       
       
                
                
                var keys = fs.readFileSync(__dirname + "/" + "key.json", 'utf8');
                
                if(keys==req.params.transactionId){
                     delete data[req.params.customerId];
                    console.log( data );
                    fs.writeFile(__dirname + "/" + "customers.json", JSON.stringify(data), function (err) {
                        if (err) throw err;
                    });
                    fs.writeFile(__dirname + "/" + "key.json", "", function (err) {
                        if (err) throw err;
                    });
                    res.end( JSON.stringify(data));   
                }else{
                    res.end("The transaction id is wrong");  
                   }
            
        
       
       
       
   });//end of fs.readFile
});
    



var server = app.listen(8084, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})