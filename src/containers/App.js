import '../scss/App.scss';
import GridProducts from '../components/GridProducts';
import MessageModal from '../components/MessageModal';
import CoinModal from '../components/CoinModal';
import HeaderComponent from '../components/HeaderComponent';
import axios from 'axios'
import React, { useState, useEffect } from "react";
import { getUser, chargePoints } from '../api'

function App() {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState(null);
  const [openCoinModal, setOpenCoinModal] = useState(false);

  useEffect(() => {
    updateUserInfo()
  }, []);

  const updateUserInfo = () => {
    getUser()
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const chargeCoins = (amount) => {
    chargePoints(amount)
      .then(function (response) {
          updateUserInfo();
          setOpenCoinModal(false)
      })
      .catch(function (error) {
          console.log(error);
      })
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
      <HeaderComponent User={user} OpenModal={() => {setOpenCoinModal(true)}}></HeaderComponent>
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
