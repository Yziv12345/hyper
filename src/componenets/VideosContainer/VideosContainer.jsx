import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import getData from '../../services/videos-service';
import VideosFilter from '../VideoFilter/VideosFilter';
import VideoItem from '../VideoItem/VideoItem';
import './VideosContainerStyle.css';

const VideosContainer = () => {
  const [videosData, setVideosData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [originGenres, setOriginGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        if (data) {
          setVideosData(data.videos)
          setSelectedGenres(data.genres)
          setOriginGenres(data.genres)
        }
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterVideos = () => {
      let filtered = videosData;
  
      if (!isEmpty(searchText)) {
        filtered = filtered.filter(video =>
          (typeof video.artist === 'string' && video.artist.toLowerCase().includes(searchText.toLowerCase())) ||
          (typeof video.title === 'string' && video.title.toLowerCase().includes(searchText.toLowerCase()))
        );
      }
  
      if (selectedYear) {
        filtered = filtered.filter(video => video.release_year.toString() === selectedYear);
      }
  
      if (selectedGenres?.length > 0) {
        filtered = filtered.filter(video => selectedGenres.some(genre => genre.id === video.genre_id));
      }
  
      setFilteredVideos(filtered);
    };
  
    filterVideos();
  }, [searchText, selectedYear, selectedGenres, videosData]);
  

  const availableYears = [...new Set(videosData.map(video => video.release_year))];
  const availableGenres = [...new Set(selectedGenres.map(genre => genre))];
  const videos = isEmpty(filteredVideos) ? videosData : filteredVideos

  return (
    <div className="videos-container">
      <h1>Video Browser</h1>
      <VideosFilter
        VideosFilter={searchText}
        setSearchText={setSearchText}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        availableYears={availableYears}
        availableGenres={availableGenres}
        originGeneres={originGenres}
      />
      <div className='videos-grid'>
        {!isEmpty(videos) ? (
          videos.map((videoItemData, index) => (
            <div key={index} className="video-wrapper">
              <VideoItem videoItemData={videoItemData} />
            </div>
          ))
        ) : (
          <p>No Videos Found</p>
        )}
      </div>
    </div>
  );
};

export default VideosContainer;
