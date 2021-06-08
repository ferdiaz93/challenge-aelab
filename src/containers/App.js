import '../scss/App.scss';
import GridProducts from '../components/GridProducts';
import MessageModal from '../components/MessageModal';
import CoinModal from '../components/CoinModal';
import axios from 'axios'
import React, { useState, useEffect } from "react";

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
  
  const closeMessageModal = () => {
    setMessage(null);
  }

  const closeCoinModal = () => {
    setOpenCoinModal(false);
  }



  return (
    <div className="App">
      <header className="header">
        <a href="https://aerolab.co/" target="_blank"><img src="./assets/aerolab-logo.svg"></img></a>
        <div className="user-info">
          <span>{user.name}</span>
          <button className="default-button" onClick={() => setOpenCoinModal(true)}>
            {user.points} <img src="./assets/icons/coin.svg"></img>
          </button>
        </div>
      </header>
      <section className="divider">
        <h1 className="title">Electronics</h1>
      </section>
      <section className="content">
        <GridProducts Points={user.points} openModal={openModal}></GridProducts>
      </section>
      <MessageModal OpenedModal={message} Message={message} CloseModal={closeMessageModal}></MessageModal>
      <CoinModal OpenedModal={openCoinModal} ChargeCoins={chargeCoins} CloseModal={closeCoinModal}></CoinModal>
    </div>
  );
}

export default App;
