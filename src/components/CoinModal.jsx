const CoinModal = ({ChargeCoins,CloseModal}) => {
    return (
        <>
        <div className="modal">
            <div className="modal-content coin-modal">
                <p>Select amount</p>
                <button className="default-button coin-button" onClick={()  => ChargeCoins(1000)}>Charge 1000 <img src="./assets/icons/coin.svg" alt="" /></button>
                <button className="default-button coin-button" onClick={()  => ChargeCoins(5000)}>Charge 5000 <img src="./assets/icons/coin.svg" alt="" /></button>
                <button className="default-button coin-button" onClick={()  => ChargeCoins(7500)}>Charge 7500 <img src="./assets/icons/coin.svg" alt="" /></button>

                <button className="default-button close-button" onClick={CloseModal}>Close</button>
            </div>
        </div>
        </>
    )
}

export default CoinModal;