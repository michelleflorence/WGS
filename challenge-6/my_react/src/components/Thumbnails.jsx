import React from "react";

const Thumbnails = ({url, title, channelTitle, onClick}) => {
  return (
    <div className="flex flex-row gap-4 mb-4" onClick={onClick}>
        <img
        className="cursor-pointer"
        src={url}
        alt="Thumbnail"
        width={235}
        height={150}
        />
        <div> 
            <h2 className="text-lg font-bold hover:text-blue-600 cursor-pointer">{title}</h2>
            <p>{channelTitle}</p>
        </div>
    </div>
  )
}

export default Thumbnails
