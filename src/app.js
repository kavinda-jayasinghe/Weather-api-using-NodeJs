const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forcast=require("./utils/forcast");
const geocode=require("./utils/geocode");


const app = express();

app.set("view engine", "hbs");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath=path.join(__dirname,"../templates/partials");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

 const publicDirectoryPath = path.join(__dirname, "../public");
 app.use(express.static(publicDirectoryPath));



 app.get("/", (req, res) => {
     res.render("index", {
        title: "Weather App...",
         name: "kavi"
    });
 });

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About page",
        name: "author" 
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "kavi"
    });
});


 app.get("/weather", (req, res) => {

    if(!req.query.address){
       return res.send({
            error: "You must provide an address."
        });
    }

    geocode(req.query.address,(error,response)=>{
        if(error){
            return res.send({
                eror:error
            });
        }

        forcast(response.latitude,response.longitude,(error,forcastData)=>{
            if(error){
                return res.send({
                    eror:error
                }); 
            }
            res.send({
                forcast:forcastData,
                location:response.location,
                address:req.query.address
            });
        });
    });

});
 

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "kavi"
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
