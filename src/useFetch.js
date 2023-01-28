import React, { useState, useContext, useEffect } from 'react'
const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_KEY}`

const useFetch = (urlParams) => {
   //useState
  const [isLoading, setIsLoading]=useState(true)
  const [error, setError]=useState({show:false, msg:''})
  const [data, setData]=useState(null)
  //fetchMovies-function
  const fetchMovies = async (url)=>{
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      if(data.Response === 'True'){
        setData(data.Search || data)
        setError({show:false, msg:''})
      }else{
        setError({show:true, msg:data.Error})
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  //useEffect
  useEffect(()=>{
    fetchMovies(`${API_ENDPOINT}${urlParams}`)
  },[urlParams])
  return{isLoading, error, data}
}

export default useFetch
