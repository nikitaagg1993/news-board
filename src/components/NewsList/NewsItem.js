import React from 'react'

const NewsItem = ({ title, description, author, url }) => {
    return (
        <div key={title} className='news-list-item'>
            <h4><a href={url} target='__blank'>{title}</a></h4>
            <h6>{description}</h6>
            <h6>Author: {author}</h6>
        </div>
    );
}

export default NewsItem;