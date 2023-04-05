import React from 'react'; 

import { useParams } from 'react-router-dom';

const CatInfo = ({ catFacts }) => {
  const { id } = useParams();
  const fact = catFacts.find((fact) => fact._id === id);

  return ( 
    <div>
      <h2>Fact Details</h2>
      <table>
        <tbody>
          <tr>
            <td>Fact:</td>
            <td>{fact.text}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>{fact.status.verified ? 'Verified' : 'Unverified'}</td>
          </tr>
          <tr>
            <td>Number of Times Sent:</td>
            <td>{fact.status.sentCount}</td>
          </tr>
          <tr>
            <td>Source:</td>
            <td>{fact.source}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CatInfo;

