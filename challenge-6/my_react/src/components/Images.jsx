import React from 'react'

const Images = ({url}) => {
  return (
    <div>
        <img src={url} alt='searchImage' className='rounded mb-4'/>
    </div>
  )
}

export default Images
