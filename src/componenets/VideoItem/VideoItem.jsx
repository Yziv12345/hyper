import React from 'react';
import './VideoItem.css'; 

 const VideoItem = ({videoItemData}) => {
  
  if (!videoItemData) return
  const {artist, title, release_year, image_url} = videoItemData

  return (
    <div className="video-item-container">
        <div className='vid-img'>
            <img src={image_url} alt="v-img"></img>
        </div>
        <div className='video-detais'>
            <p>{title}</p>
            <p>{artist}</p>
            <p>{release_year}</p>
        </div>
    
    </div>
  );
};

export default VideoItem;