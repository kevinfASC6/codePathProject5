import React, { useState, useEffect } from "react";
import axios from "axios";
import CatCard from "./CatCard";
import CatList from "./CatList";
import CatNavBar from "./CatNavBar";
import CatHeader from "./CatHeader";

const CatMain = () => {
  const URL =
    "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&lang=eng&amount=15";
  const [catFacts, setCatFacts] = useState([]);
  const [catCards, setCatCards] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(URL);
    const verifiedFacts = response.data.filter((fact) => fact.status.verified);
    setCatFacts((prevFacts) => [...prevFacts, ...verifiedFacts]); 
    if(catCards === null) setCatCards(verifiedFacts[0]);
  };

  useEffect(() => {
    if (catFacts.length < 15) {
      fetchData();
    }
  }, [catFacts]);

  return (
    <div className="container">
      <div className="topLeft">
        <CatHeader />
        <CatNavBar />
      </div>
      <div className="totalCards">
        <CatCard descrip1= "15" descrip2="Total facts" />
        {catCards && (
          <CatCard descrip1={new Date(catCards.updatedAt).toLocaleString()} descrip2="Time Updated"/>
        )}
        {catCards && ( 
            <CatCard descrip1= {`"${catCards.text}"`} descrip2="Did you know?" />
        )}
      </div>
      <div className="bottom">
        <CatList catFacts={catFacts.slice(0, 15)} />
      </div>
    </div>
  );
};

export default CatMain;

