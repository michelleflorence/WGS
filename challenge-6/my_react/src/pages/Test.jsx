import React, { useEffect, useState } from 'react'

const Test = () => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        setComments(JSON.parse(localStorage.getItem('data')))
    }, [comments])
    
  return (
    <div>
      <ul>
        {comments.map((comment) => (
            <li>{comment.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default Test
