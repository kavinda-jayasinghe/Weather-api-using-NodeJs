

const weartherForm=document.querySelector("form");
const locationInput=document.querySelector("#location");
const message1=document.querySelector(".message-1");
const message2=document.querySelector(".message-2");

weartherForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    message1.textContent="";
    message2.textContent="";
    message1.textContent="Loading...";
    const location=locationInput.value;

    //console.log("Form submitted...");

if(location.length===0){

message1.textContent="please provide an Address";

}

else{
    fetch("http://localhost:3000/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
    
            if(data.error){
                message1.textContent=data.error;
            }
            else{
                message1.textContent=data.location;
                message2.textContent=data.forcast;
              
            }
        })
    })
}

   
})