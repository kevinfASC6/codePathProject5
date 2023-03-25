import React, { useState } from 'react';

const CatList = (props) => {
  const [searchText, setSearchText] = useState('');
  const [sentCount, setSentCount] = useState(0);
  const [searchUser, setSearchUser] = useState('');

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSentCountChange = (event) => {
    setSentCount(event.target.value);
  };

  const handleSearchUserChange = (event) => {
    setSearchUser(event.target.value);
  };

  const filterFacts = () => {
    return props.catFacts.filter(
      (fact) =>
        fact.text.toLowerCase().includes(searchText.toLowerCase()) &&
        fact.status.sentCount >= sentCount &&
        (searchUser === '' || fact.source === searchUser || fact.source === 'api') 
        && (searchUser === '' || fact.source === searchUser || fact.source === 'user') 
    );
  };

  const filteredFacts = filterFacts();

  return (
    <div>
      <div className="filters">
        <div className="wordFilter">
          <input
            type="text"
            placeholder="Enter Keyword"
            value={searchText}
            onChange={handleSearchTextChange}
          />
        </div>
        <div className="likefilter">
          <label htmlFor="catLikes">Number of Times Sent:</label>
          <input
            type="number"
            name="catLikes"
            min="0"
            max="10"
            step="1"
            value={sentCount}
            onChange={handleSentCountChange}
          />
        </div>
        <div>
          <label htmlFor="userfilter">Filter by User:</label>
          <select value={searchUser} onChange={handleSearchUserChange}>
            <option value="">All Users</option>
            <option value="api">API</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Facts</th>
              <th>Updated At</th>
              <th># Of Times Sent</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {filteredFacts.map((fact, index) => (
              <tr key={index}>
                <td>{fact.text}</td>
                <td>{fact.updatedAt}</td>
                <td>{fact.status.sentCount}</td>
                <td>{fact.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CatList;

