import React, { useState } from 'react'
import axios from 'axios'
import Images from '../components/Images'

const SearchImage = () => {
  const [images, setImages] = useState([])
  const [keyword, setKeyword] = useState('')

  const onSearchImages = async () => { 
    try {
      const res = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${keyword}`, {
          headers: {
              Authorization: 'Client-ID yjKfPbTkFcGh1Ujq93NI5a9C8qgqiy6NewCZt2TZXEA'
          }
      })

      setImages(res.data.results)
    } catch (e) {
      console.log(e)
    }
   }

  return (

    <div className='flex flex-col items-center justify-center'>
      <div className='ui form flex flex-col items-center justify-center'>
        <div class="ui search ml-8">
          <div class="ui icon input w-96 mr-3">
            <input type="text" placeholder="Search for image..." 
            value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
            
            <i class="search icon"></i>
          </div>
          
          <button className='ui primary button' onClick={onSearchImages}>
              Search
          </button>
        </div>

        <div className='grid-layout p-8 gap-x-4'>
          {images.map((image) => (
            <Images url = {image.urls.full}/>
          )) }
        </div>
      </div>
    </div>
  )
}

export default SearchImage

// <div className='relative w-[500px] h-[500px] bg-red-500'>
//     <div className='relative bg-green-500 bottom-0'>
//       <h1>Contact</h1>
//     </div>
// </div>

// {/* <div className='field'>

//   <label className='ui search'>
//     Search Image
//     <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
//   </label>
  
// </div> */}