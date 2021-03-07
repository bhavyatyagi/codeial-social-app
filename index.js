// Steps TO MAKE ANY SCALABLE PROJECT
// 1. Make Index.js file in a new project folder and cd into it
// 2. npm init 
// 3. Make directories 
//     routes : All destinations from browsers / paths
//     controllers : Functions
//     views
//     models : Schemas / Files
//     config : configuration for mongoDB
// 4. Setup Express thru : npm i express
// 5. Declare constants, require express; and app=express(), declare ports, default port is 80, finally do app.listen
// 6. In package.json in scripts add nodemon index.js to "start"
// 7. Git init 

const express=require('express');
const app=express();
const port=786;

// app.get("/"){

// }

app.listen(port,function(error){
    if(error)
    {
        console.log("Error in running the server:\nDetails:",error);
        return;
    }
    // Instead of using string ("") and , port we can use `` and ${variableName} to do it  
    // Known as interpolation
    console.log(`Server is up and running at port: ${port}`);
});
