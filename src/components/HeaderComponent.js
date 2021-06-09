import coinIcon from '../assets/icons/coin.svg'
import aerolabLogo from '../assets/aerolab-logo.svg'

const HeaderComponent = ({User, OpenModal}) => {
    return (
        <>
            <header className="header">
                <a href="https://aerolab.co/" target="_blank" rel="noreferrer"><img src={aerolabLogo} alt="aerolab-logo"></img></a>
                <div className="user-info">
                    <span>{User.name}</span>
                    <button className="default-button" onClick={() => OpenModal()}>
                        {User.points} <img src={coinIcon} alt="coin"></img>
                    </button>
                </div>
            </header>
        </>
    )
}

export default HeaderComponent;