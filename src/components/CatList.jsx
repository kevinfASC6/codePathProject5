import React, { useState, useEffect } from 'react'; 
import { BrowserRouter, useParams, Route, Routes, Link } from 'react-router-dom';
import CatInfo from './CatInfo';

const CatList = (props) => {
  const [searchText, setSearchText] = useState('');
  const [sentCount, setSentCount] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [filteredFacts, setFilteredFacts] = useState(props.catFacts);

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
        fact.text.toLowerCase().includes(searchText.toLowerCase()) && (sentCount === '' || fact.status.sentCount >= sentCount) && (searchUser === '' || fact.source === searchUser || fact.source === 'api') && (searchUser === '' || fact.source === searchUser || fact.source === 'user')
    );
  };

  const handleSearch = () => {
    const filteredFacts = filterFacts();
    setFilteredFacts(filteredFacts);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return ( 
    <BrowserRouter>
      <div>
        <div className="filters">
          <div className="wordFilter">
            <input type="text" placeholder="Enter Keyword" value={searchText} onChange={handleSearchTextChange}/>
          </div>
          <div className="likefilter">
            <label htmlFor="catLikes">Number of Times Sent:</label>
            <input type="number" name="catLikes" min="0" max="10" step="1" value={sentCount} onChange={handleSentCountChange} />
          </div>
          <div>
            <label htmlFor="userfilter">Filter by User:</label>
            <select value={searchUser} onChange={handleSearchUserChange}>
              <option value="">All Users</option>
              <option value="api">API</option>
              <option value="user">User</option>
            </select>
          </div>
          <button onClick={handleSearch}>Filter</button>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Facts</th>
                <th>Updated At</th>
                <th># Of Times Sent</th>
                <th>Source</th> 
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredFacts.map((fact, index) => (
                <tr key={index}>
                  <td>{fact.text}</td>
                  <td>{fact.updatedAt}</td>
                  <td>{fact.status.sentCount}</td>
                  <td>{fact.source}</td>  
                  <td>      
                    <Link to={`/CatInfo/${fact._id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Routes>
            <Route path="/CatInfo/:id" element={<CatInfo catFacts={props.catFacts} />} />
          </Routes>
        </div>
      </div> 
    </BrowserRouter>
  );
};

export default CatList; 



