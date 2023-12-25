import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Videos from "../components/Videos";
import Thumbnails from "../components/Thumbnails";

const SearchVideo = () => {
    const [videos, setVideos] = useState(null)
    const [keyword, setKeyword] = useState('')
    const [thumbnails, setThumbnail] = useState([]) 

    const onSearchVideos = useCallback (async () => {
        try {
          const res = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                key: 'AIzaSyBTvzFaBojTsfr6llcfwhUbgS_LUG39kBY',
                part: 'snippet',
                type: 'video',
                q: keyword,
            }
          })

        // Munculin 1 video
          setVideos(res.data.items[0])

        // Muncul thumbnail
          setThumbnail(res.data.items.slice(1))
        } catch (e) {
          console.log(e)
        }
       }, [keyword]);

    const  handleThumbnailClick = (videoId) => {
        const selectedVideo = thumbnails.find((thumbnail) => thumbnail.id.videoId === videoId);
        setVideos(selectedVideo);
    }

    useEffect(() => {
        // This will trigger when the component mounts or when keyword changes
        onSearchVideos();
      }, [onSearchVideos, keyword]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className='ui form flex flex-col items-center justify-center'>
                <div className="ui search">
                    <div className="ui icon input w-96 mr-3">
                    <input type="text" placeholder="Search for videos..." 
                    value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
                    
                    <i className="search icon"></i>
                    </div>
                    
                    <button className='ui primary button' onClick={onSearchVideos}>
                        Search Videos
                    </button>
                </div>

                <section className="grid h-screen grid-cols-2">
                    <div className='p-8 gap-x-2'>
                        {!videos ? '' : 
                            <Videos url = {videos.id.videoId}
                            title = {videos.snippet.title}
                            description = {videos.snippet.description}
                            />
                        }
                    </div>

                    <div className="p-8 gap-x-2">
                        <div>
                            {thumbnails.map((thumbnail, index) => (
                                <Thumbnails key={index} 
                                url = {thumbnail.snippet.thumbnails.medium.url} 
                                title = {thumbnail.snippet.title}
                                channelTitle = {thumbnail.snippet.channelTitle}
                                onClick={() => handleThumbnailClick(thumbnail.id.videoId)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default SearchVideo