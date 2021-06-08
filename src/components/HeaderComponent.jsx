const HeaderComponent = ({User, OpenModal}) => {
    return (
        <>
            <header className="header">
                <a href="https://aerolab.co/" target="_blank"><img src="./assets/aerolab-logo.svg"></img></a>
                <div className="user-info">
                    <span>{User.name}</span>
                    <button className="default-button" onClick={() => OpenModal()}>
                        {User.points} <img src="./assets/icons/coin.svg"></img>
                    </button>
                </div>
            </header>
        </>
    )
}

export default HeaderComponent;