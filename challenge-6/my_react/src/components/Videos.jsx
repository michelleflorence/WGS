import React from 'react'

const Videos = ({url, title, description}) => {
  return (
    <div>
        <iframe 
          width="610" 
          height="390" 
          src={`https://www.youtube.com/embed/${url}`} 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
        </iframe>

        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          <p>{description}</p>
        </div>
    </div>
  )
}

export default Videos
