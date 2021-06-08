import '../scss/App.scss';
import GridProducts from '../components/GridProducts';
import MessageModal from '../components/MessageModal';
import CoinModal from '../components/CoinModal';
import axios from 'axios'
import React, { useState, useEffect } from "react";
import { orderHighestPrice, orderLowestPrice } from '../utils'

function App() {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState(null);
  const [openCoinModal, setOpenCoinModal] = useState(false);

  useEffect(() => {
    updateUserInfo()
  }, []);

  const updateUserInfo = () => {
    axios.get('https://coding-challenge-api.aerolab.co/user/me', {
      headers: {
        'Authorization': 'Bearer ' + process.env.REACT_APP_AEROLAB_TOKEN
      }
    })
    .then(function (response) {
      setUser(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }

  const chargeCoins = (amount) => {
    axios({
      method: 'post',
      url: 'https://coding-challenge-api.aerolab.co/user/points',
      data: {
          amount: amount,
      },
      headers: {
          'Authorization': 'Bearer ' + process.env.REACT_APP_AEROLAB_TOKEN
      }
  })
  .then(function (response) {
      console.log(response);
      updateUserInfo();
      setOpenCoinModal(false)
  })
  .catch(function (error) {
      // handle error
      console.log(error);
  })
  .then(function () {
      // always executed
  });
  }

  const openModal = (message) => {
    setMessage(message);
    updateUserInfo();
  }
  
  const closeModal = () => {
    setMessage(null);
  }



  return (
    <div className="App">
      <header className="header">
        <img src="./assets/aerolab-logo.svg"></img>
        <div className="user-info">
          <span>{user.name}</span>
          <button className="default-button" onClick={() => setOpenCoinModal(true)}>{user.points} <img src="./assets/icons/coin.svg"></img></button>
        </div>
      </header>
      <section className="divider">
        <h1 className="title">Electronics</h1>
      </section>
      <section className="content">
        <GridProducts Points={user.points} openModal={openModal}></GridProducts>
      </section>
      {message ? <MessageModal Message={message} CloseModal={closeModal}></MessageModal> : null}
      {openCoinModal ? <CoinModal ChargeCoins={chargeCoins} CloseModal={closeModal}></CoinModal> : null}
    </div>
  );
}

export default App;
