import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

import NewsItem from './NewsItem'

const fetchData = async (setData, setError, keyword ='') => {
    try {
        const response = await axios(`http://localhost:8081/api/news?keyword=${keyword}`)
        setData( response.data.articles || [])
        setError('')
    } catch(e) {
        setData([])
        setError(e.message)
    }
}

const NewsList = (props) => {
    const [data, setData] = useState([])
    const [keyword, setKeyword] = useState()
    const [error, setError] = useState('')

    useEffect(()=>{
        fetchData(setData,setError);
    },[])

    const renderContent = () => {
        if(data && data.length) {
            return (
                data.map(item => <NewsItem key={uuidv4()} {...item}/>)
            )
        }
        if(error)  return <div>{error}</div>
        return <div>No data found</div>
    }

    const handleSearch = () => {
        fetchData(setData, setError, keyword)
    }


    return (
        <div>
            <h2>News Board</h2>
            <input placeholder='Enter a keyword' onChange={(e) => setKeyword(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            {renderContent()}
        </div>
    )
}

export default NewsList;