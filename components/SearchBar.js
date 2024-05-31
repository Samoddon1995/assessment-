import React, { useState } from 'react';

const SearchBar = ({ setSearchTerm }) => {
  const [term, setTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(term);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search Repos"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
