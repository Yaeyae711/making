import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import styles from "./modules/Home.module.css";
import Likes from "./Likes";

const getDatafromLS = () => {
  let data = JSON.parse(localStorage.getItem("items"));
  if (data) {
    return data;
  } else {
    return [];
  }
};

const Home = () => {
  const [apiData, setapiData] = useState([]);
  const [items, setItems] = useState(getDatafromLS());

  const initialLoad = () => {
    axios
      .get(`https://rickandmortyapi.com/api/character`)
      .then((res) => {
        setapiData(res.data.results);
        console.log(res.data.results);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    initialLoad();
  }, []);

  const clickhandler = (index) => {
    setItems([...items, apiData[index]]);
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div>
      <Navbar />

      <div
        className="row row-cols-1 row-cols-md-3 g-4"
        style={{ marginLeft: "20px", marginRight: "20px" }}
      >
        {apiData.map((ele, i) => (
          <div key={i} className={styles.flipcard}>
            <div className={styles.flipcardinner}>
              <div className={styles.flipcardfront}>
                <img src={ele.image} alt="Avatar" />
                <button onClick={() => clickhandler(i)}>
                  <FaRegThumbsUp></FaRegThumbsUp>
                </button>
              </div>
              <div className={styles.flipcardback}>
                <h1>Name : {ele.name}</h1>
                <p>Status : {ele.status}</p>
                <p>Gender : {ele.gender}</p>
                <p>Species : {ele.species}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Likes
        data={items.map((ele, i) => (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div class="col">
              <div class="card">
                <img src={ele.image} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">{ele.name}</h5>
                </div>
                <button>
                  <FaRegThumbsDown></FaRegThumbsDown>
                </button>
              </div>
            </div>
          </div>
        ))}
      />
    </div>
  );
};

export default Home;
