import React from 'react';
import './VideosFilter.css';

const VideosFilter = ({ searchText, setSearchText, selectedYear, setSelectedYear, selectedGenres, setSelectedGenres, availableYears, availableGenres, originGeneres }) => {

  const handleGenreChange = (e) => {
    const genreID = e.target.value;
    const newGaneres = selectedGenres.filter(g => {return g.id.toString() === genreID})
    if (newGaneres) {
      setSelectedGenres(newGaneres);
    }
  };

  const handleGenreRemove = (genre) => {
    const generes = originGeneres.filter((g) => {return g.id.toString() !== genre.id})
    setSelectedGenres(generes);
  };

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search by artist or title"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value.toLowerCase())}
      />
      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        <option value="">All Years</option>
        {availableYears.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <select value="" onChange={handleGenreChange}>
        <option value="" disabled>Select Genre</option>
        {availableGenres.map(genre => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
      <div className="selected-genres">
        {selectedGenres?.map(genre => (
          <div key={genre.id} className="selected-genre">
            {genre.name}
            <button type="button" onClick={() => handleGenreRemove(genre)}>x</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosFilter;
