import React from 'react';
import { Link } from 'react-router-dom';

const RepoItem = ({ repo }) => {
  return (
    <li>
      <Link to={`/repo/${repo.name}`}>{repo.name}</Link>
    </li>
  );
};

export default RepoItem;
