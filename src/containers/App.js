import '../scss/App.scss';
import GridProducts from '../components/GridProducts';

function App() {
  return (
    <div className="App">
      <header className="header">
        <img src="./assets/aerolab-logo.svg"></img>
        <div class="user-info">
          <span>John Kite</span>
          <button class="default-button">6000 <img src="./assets/icons/coin.svg"></img></button>
        </div>
      </header>
      <section class="divider">
        <h1 class="title">Electronics</h1>
      </section>
      <section class="content">
        <GridProducts></GridProducts>
      </section>
    </div>
  );
}

export default App;
