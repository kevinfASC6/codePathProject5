import React, { useState, useEffect } from "react";
import axios from "axios";
import CatCard from "./CatCard";
import CatList from "./CatList";
import CatNavBar from "./CatNavBar";
import CatHeader from "./CatHeader";
import CatInfo from "./CatInfo";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const CatMain = () => {
  const URL =
    "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&lang=eng&amount=15";
  const [catFacts, setCatFacts] = useState([]);
  const [catCards, setCatCards] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(URL);
      const verifiedFacts = response.data.filter((fact) => fact.status.verified);
      const newFacts = verifiedFacts.filter(
        (fact) => !catFacts.some((existingFact) => existingFact.text === fact.text)
      );
      setCatFacts((prevFacts) => [...prevFacts, ...newFacts]);
      if (catCards === null) setCatCards(newFacts[0]);
    };
    if (catFacts.length < 15) {
      fetchData();
    }
  }, [catFacts, catCards, URL]);

  const handleClick = () => {
    setShowDetails(true);
  };

  const getAverageWords = (text) => {
    const words = text.split(" ");
    return words.length;
  };

  const avgWordsData = catFacts.map((fact) => ({
    text: fact.text,
    avgWords: getAverageWords(fact.text),
  }));

  return (
    <div className="container">
      <div className="topLeft">
        <CatHeader />
        <CatNavBar />
      </div>
      <div className="totalCards">
        <CatCard descrip1="15" descrip2="Total facts" />
        {catCards && (
          <CatCard
            descrip1={new Date(catCards.updatedAt).toLocaleString()}
            descrip2="Time Updated"
          />
        )}
        {catCards && (
          <CatCard descrip1={`"${catCards.text}"`} descrip2="Did you know?" />
        )}
      </div> 
      <div className="chart">
        <h3>Average words per fact:</h3>
        <BarChart width={600} height={300} data={avgWordsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="text" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgWords" fill="#8884d8" />
        </BarChart>
      </div>
      <div className="bottom">
        {showDetails ? (
          <CatInfo catFacts={catFacts} />
        ) : (
          <CatList catFacts={catFacts} handleClick={handleClick} />
        )}
      </div>
    </div>
  );
};

export default CatMain;



