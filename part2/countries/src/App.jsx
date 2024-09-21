import { useState, useEffect } from "react"
import axios from 'axios'

const API_KEY = "9d15566f7fbbda68cba8afc56c863d0d"

function App() {
  let [newCountry, setNewCountry] = useState('')
  let [newList, setNewList] = useState([])
  let [wheatherStatue, setWheatherStatue]=useState(null)

  useEffect(()=>{
    if(newCountry.length){
      axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response=>{
        let data = response.data.filter(n=>n.name.common.toLowerCase().includes(newCountry.toLowerCase()))
        console.log(data.length)
        console.log("data.length")
        
        if(response.data.filter(n=>n.name.common.toLowerCase().includes(newCountry.toLowerCase())).length === 1){
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].capitalInfo.latlng[0]}&lon=${data[0].capitalInfo.latlng[1]}&appid=${API_KEY}`).then(res=>{
            console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].capitalInfo.latlng[0]}&lon=${data[0].capitalInfo.latlng[1]}&appid=${API_KEY}`)
            console.log(res.data)
            setWheatherStatue(res.data)
          }
          )
        }else setWheatherStatue(null)
        

        console.log(data)
        setNewList(data)


        
      })
      
    }
  }, [newCountry])

  useEffect(()=>{
    console.log(wheatherStatue)
  }, [wheatherStatue])


  console.log(newList)
  console.log(newList.length)

  const handleNewCountry=(event)=>{
    setNewCountry(event.target.value)
  }
  const handleViewCountry=(value)=>{
    setNewCountry(value.name.common)
  }

  return (
    <>
      <p>
        find countries
        <input onChange={handleNewCountry} value={newCountry}/>
      </p>
      <Show newList={newList} handleViewCountry={handleViewCountry} wheatherStatue={wheatherStatue}/>
    </>
  )
}
const Show=({newList, handleViewCountry, wheatherStatue})=>{
  
  if(newList.length>10){
    return <p>Too many matches, specify another filter</p>
  }else if(newList.length>1){
    return (
      <>
      {
        newList.map((n, i)=> <p key={i}> {n.name.common} <button onClick={()=>handleViewCountry(n)} >show</button></p>)
      }
      </>
    )
  }else if(newList.length == 1){
    let country = newList[0]
    console.log(country.languages)
    Object.values(country.languages).map((n, i)=>{
      console.log(n)
    })
    console.log(wheatherStatue)
    console.log('wheatherStatue')
    if(wheatherStatue===null)return <></>

    

    return (
      <>

        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>

        <h3>languages</h3>
        <ul>
          {
            Object.values(country.languages).map((n, i)=> <li key={i}> {n} </li>)
          }
        </ul>

        <img src={country.flags.svg}  width="320"/>

        <h2>Weather in {country.capital}</h2>
        <p>temperature {wheatherStatue.main.temp - 273.15} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${wheatherStatue.weather[0].icon}@2x.png`}  width="320"/>
        <p>wind {wheatherStatue.wind.speed} m/s</p>
      </>
    )
  }else {
    return <p>not found</p>
  }
}
export default App
