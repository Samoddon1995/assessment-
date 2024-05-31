import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const RepoPage = () => {
  const { repoName } = useParams();
  const [repo, setRepo] = useState(null);
  const [newDescription, setNewDescription] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchRepo = async () => {
      const response = await axios.get(
        `https://api.github.com/repos/YOUR_USERNAME/${repoName}`,
        { headers: { Authorization: `token YOUR_GITHUB_TOKEN` } }
      );
      setRepo(response.data);
      setNewDescription(response.data.description);
    };
    fetchRepo();
  }, [repoName]);

  const handleUpdateRepo = async () => {
    await axios.patch(
      `https://api.github.com/repos/YOUR_USERNAME/${repoName}`,
      { description: newDescription },
      { headers: { Authorization: `token YOUR_GITHUB_TOKEN` } }
    );
    const updatedRepo = { ...repo, description: newDescription };
    setRepo(updatedRepo);
  };

  const handleDeleteRepo = async () => {
    await axios.delete(
      `https://api.github.com/repos/YOUR_USERNAME/${repoName}`,
      { headers: { Authorization: `token YOUR_GITHUB_TOKEN` } }
    );
    history.push('/');
  };

  if (!repo) return <div>Loading...</div>;

  return (
    <div>
      <h1>{repo.name}</h1>
      <textarea
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      ></textarea>
      <button onClick={handleUpdateRepo}>Update Description</button>
      <button onClick={handleDeleteRepo}>Delete Repo</button>
      <p>Stars: {repo.stargazers_count}</p>
      <p>Forks: {repo.forks_count}</p>
    </div>
  );
};

export default RepoPage;

