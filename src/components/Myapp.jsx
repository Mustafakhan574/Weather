import React, { useState } from 'react'
import cloud from "../assets/clouds.webp"
import clear from "../assets/clear weather.webp"
import error from "../assets/error.jpg"
import mist from "../assets/mist.webp"
import rain from "../assets/rain.webp"
const Myapp = () => {
          const [input,setinput]=useState("");
          const [data,setdata] = useState()
          const [err,seterr] = useState()
          const Api = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
          const Apikey = "60e99ec5d39b3a0bc6e3589b00d93864";
          const handleinput=(e)=>{
               setinput(e)
               console.log(e)
          }
          const search=async()=>{
           const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${Apikey}&units=metric`)
           const result =await data.json();
           console.log(result)
           setdata(result);
           if(input === ""){
                    seterr("enter name")
           }
           else if(result.cod == '404'){
                    seterr("enter valid name")
           }else{
                    seterr("");
           }
           
           setinput("");
          }
          const getWeatherImage = (main) => {
    switch (main) {
      case "Clouds":
        return cloud;
      case "Clear":
        return clear;
      case "Mist":
      case "Haze":
        return mist;
      case "Rain":
        return rain;
      default:
        return cloud;
    }
  };
  return (
    <div className='w-[100%] h-[100vh] flex  flex-col   bg-gray-400 justify-center items-center'>
      <div className='w-[50%] h-[70%] border flex flex-col justify-center rounded-3xl bg-[#def5de]'>
         <div className='flex justify-center  w-full mt-2'>
<input type="text" placeholder='enter city...' className='border p-3 rounded-3xl rounded-r-none w-[50%] bg-white' value={input} onChange={(e)=>handleinput(e.target.value)}/>
<button className='border p-3 rounded-3xl rounded-l-none bg-[aqua]'onClick={search}>Search</button>
          </div> 
          <div className='flex flex-col justify-center items-center'>
          {err && (
        <div className='flex flex-col w-[55%] h-[70%]  border justify-center items-center rounded-3xl bg-white'>
          <p className="text-xl font-bold">{err}</p>
          <img src={error} alt="error" className='w-[300px] h-[300px]'/>
        </div>
      )}
      </div>
          <div className='flex flex-col  w-full h-full  items-center '>
            {
                    data && data.weather ? <div className='flex flex-col w-[62%] h-[87%]  border justify-center items-center rounded-3xl bg-white rounded-t-2xl'>
                               <p className="text-xl font-bold">{data.name}</p>
        <img
            src={getWeatherImage(data.weather[0].main)}
            className="w-[300px] h-[300px]"
            alt="weather"
          />
                              <p className="text-2xl">{Math.floor(data.main.temp)}°C</p>
          <p className="capitalize">{data.weather[0].description}</p>
                    </div>:""
            }
          </div>
          
    </div>
    </div>
  )
}

export default Myapp