import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RepoItem from './RepoItem';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRepos();
  }, [currentPage, searchTerm]);

  const fetchRepos = async () => {
    const perPage = 10;
    const query = searchTerm ? `&q=${searchTerm}` : '';
    const response = await axios.get(
      `https://api.github.com/user/repos?per_page=${perPage}&page=${currentPage}${query}`,
      { headers: { Authorization: `token YOUR_GITHUB_TOKEN` } }
    );
    setRepos(response.data);
    setTotalPages(Math.ceil(response.headers['x-total-count'] / perPage));
  };

  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} />
      <ul>
        {repos.map(repo => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default RepoList;
