const express= require("express");
const app = express();
const https=require("https");
const body_parser=require("body-parser");
app.use(body_parser.urlencoded({extended:true}));

app.get("/",function(req,res){
    
    res.sendFile(__dirname +"/index.html");
   
});
app.post("/",function(req,res){
      
        const query=req.body.cityName;
        const apiKey="b97fdf5211d57006554710e27ef50a78";
        const units="metric";
        const url="https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid="+apiKey+"&units="+units;
        https.get(url,function(response){

        console.log(response.statusCode);
        // to get the data from api we write response.on
        response.on("data",function(data){

                const weatherData=JSON.parse(data);
                console.log(weatherData);
                const temp=weatherData.main.temp;
                const des=weatherData.weather[0].description;  
                const icon=weatherData.weather[0].icon;
                const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
                res.write("<h1>The Temprature in "+query+" is "+temp+" Degree celcius</h1>");
                res.write("<p>The weather description is: "+des+"</p>");
                res.write("<img src="+imageURL+">");
                res.send();
            });
        });

});









app.listen(3000,function(){
    console.log("The Server is on and at 3000 port.")
})