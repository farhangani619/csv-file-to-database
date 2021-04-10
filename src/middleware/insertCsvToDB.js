const path = require('path')
const mongoose  = require('mongoose')
const filelocation = path.join(__dirname, '../files')
const File = require('../models/file')
const insertCsvToDB =  (req,res)=>{
    const csvFilePath=`${filelocation}\\${req.file.filename}`
        //getting the csv file which was uploaded 
        const csv=require('csvtojson')//converting csv to json
        csv()
        .fromFile(csvFilePath)
        .then((jsonObj)=>{
        let obj= jsonObj[0]
        for(let key in obj){
            let attrName = key
            let attrValue=obj[key]
            // creating a dynamic schema using the values of csv file
            mongoose.model('File').schema.add({
                [attrName] : {type : String}
              });
             
        }
        // inserting the converted json object from csv to db
        File.insertMany(jsonObj).then(function(){
            res.status(201).send()
            console.log("Data inserted") 
             
           
        }).catch(function(error){
            console.log('hello')
            res.status(400).send()    
        });      
        })
        
}

module.exports=insertCsvToDB
