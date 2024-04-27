//index.js
const express=require("express")
const { connectionToDb } = require("./config/dbConfig")
const { userRouter } = require("./routes/user.router")
require("dotenv").config()
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

 

const app=express()
app.use(express.json())


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Learning Swagger',
        version: '1.0.0',
      },
      servers:[
      {
             url :"http://localhost:8080/"
      },
      {
            url :"http://www.example.com"
      } 
    ]
    },
    apis: ['./routes/*.js'], 
  };
  
    
  const openapiSpecification = swaggerJsdoc(options);

app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/users",userRouter)

app.listen(process.env.port,async ()=>{
    try{
        await connectionToDb()
    } catch(err){
        console.log(err)
    }
    console.log(`Running at port ${process.env.port}`)
})
