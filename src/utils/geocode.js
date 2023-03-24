const request=require("postman-request");

//geo coding

const geocode=(address,callback)=>{


    const geoURL="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoia2F2aW5kYXNhbiIsImEiOiJja3Q1eGY0emcwY3c1MnhwZWNub3hxMzNkIn0.oC3kexY8TZz1SGdurZcdLw&limit=1";
  
    request({url:geoURL,json:true},(error,response)=>{
    
        if(error){
            callback("Error happened...",undefined);
        }
        else if(response.body.features.length===0)
        {
            callback("Location not found...!!",undefined);
        }
        else{
            const data={
                
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            }
            callback(undefined,data);
        }
      
    });
}


module.exports=geocode;