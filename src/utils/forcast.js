const request=require("postman-request");

const forcast=((latitude,longitude,callback)=>{

 
    const weatherURL="http://api.weatherstack.com/current?access_key=c653273058177a9e0c5750c93de4ad87&query=" + latitude+","+longitude;

    request({url:weatherURL,json:true},(error,response)=>{
    
       // console.log(response);
       //console.log(response.body);
    
       //response.body give to us json output...we need to translate json to js,,,,so now we use parse();
    
    if(error){
        callback("Error connecting to the weather server..please cheack internet connetion..",undefined);
    }
    else if(response.body.error){
        callback("pease enter the write location...");
    }
    
    else{
        const weather=response.body;//console.log(weather);
                                    //show the web josn text as js obect
        const report=" temperature is :" + weather.current.temperature;

          callback(undefined,report) //temperature is in the current(see the web json text)
    }
    
    }); 
    
    

});
module.exports=forcast;

