import "./../../styles/index.scss";
const Donate = () => {
  return (
    <div className="wrapper_donate">
      <span>Допомогти нам</span>
      <div className="wrapper_donate__input">
        <input type="number" inputMode="numeric"></input>
      </div>
      <div className="wrapper_buttons">
        <button>+10</button>
        <button>+100</button>
        <button>+1000</button>
      </div>
      <div className="wrapper_buttons__pay">
        <button>Сплатити</button>
      </div>
    </div>
  );
};
export default Donate;
