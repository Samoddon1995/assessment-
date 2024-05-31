import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ isOpen, onClose, fetchRepos }) => {
  const [repoName, setRepoName] = useState('');
  const [repoDescription, setRepoDescription] = useState('');

  const handleCreateRepo = async () => {
    await axios.post(
      'https://api.github.com/user/repos',
      {
        name: repoName,
        description: repoDescription,
      },
      { headers: { Authorization: `token YOUR_GITHUB_TOKEN` } }
    );
    fetchRepos();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Create New Repository</h2>
      <input
        type="text"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
        placeholder="Repository Name"
      />
      <textarea
        value={repoDescription}
        onChange={(e) => setRepoDescription(e.target.value)}
        placeholder="Repository Description"
      ></textarea>
      <button onClick={handleCreateRepo}>Create</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Modal;
 
