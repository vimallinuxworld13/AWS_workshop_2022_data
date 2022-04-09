const AWS = require("aws-sdk")
AWS.config.update({ region: process.env.REGION})
const s3 = new AWS.S3()

module.exports.getQuotes = (event, context, callback) => {
  console.log("Incoming:::", event);

  //get json file from s3
  s3.getObject({
     Bucket: "myquotesbucket13",
     Key: "quotes.json"
  },
     function (err, data) {
       if (err) {
         console.error(err);
         callback(new Error(error))
         return;
        }else {
        var json = JSON.parse(data.Body)
        console.log("JSON:::", json);

        //create a response
        const response = {
           headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Origin": "*", 
           },
           statusCode: 200,
           body: JSON.stringify(json)
          
        }
        callback(null, response)

          
        }
      
      }
  
  )

}