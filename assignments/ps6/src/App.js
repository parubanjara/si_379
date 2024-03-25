// Source code from: https://github.com/soney/si379-assignments/blob/main/ps6/color-picker/src/ColorPicker.js and
// https://github.com/soney/si379-assignments/blob/main/ps6/dimension-guesser/src/DimensionGuesser.js

import React from "react";
import './App.css';
import Slider from './Slider';

const MIN = 0;
const MAX = 255;

function getRandomIntegerBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {

  const [cheatingMode, setCheatingMode] = React.useState(false);

  const [red, setRed]     = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [green, setGreen] = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [blue, setBlue]   = React.useState(getRandomIntegerBetween(MIN, MAX));

  const [red_guess, setRedGuess] = React.useState(0);
  const [green_guess, setGreenGuess] = React.useState(0);
  const [blue_guess, setBlueGuess] = React.useState(0);

  const [show, showGuess] = React.useState(false);

  const doGuess = React.useCallback(() => {
    showGuess(true);
  }, []);

  const onChangeCheatingMode = React.useCallback((e) => {
    setCheatingMode(e.target.checked);
    showGuess(true);
  }, []);

  return (
    <div className="App">
      <label id="cheating-mode">Cheating mode <input type="checkbox" value={cheatingMode} onChange={onChangeCheatingMode} /></label>
      
      <div id="color-preview" style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }} />
      {show && <div id="color-guess" style={{ backgroundColor: `rgb(${red_guess}, ${green_guess}, ${blue_guess})` }} />}
      {show && <div>{red}, {green}, {blue}</div>}
      {show && <div>{red_guess}, {green_guess}, {blue_guess}</div>}
      <p>Guess the color of the rectangle</p>

      <div id="color-picker">
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(255, 0, 0, ${red/MAX})`}}>Red:</span>
          <Slider min={MIN} max={MAX} startingValue={red_guess} onChange={r => setRedGuess(r)} />
        </div>
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(0, 255, 0, ${green/MAX})`}}>Green:</span>
          <Slider min={MIN} max={MAX} startingValue={green_guess} onChange={g => setGreenGuess(g)} />
        </div>
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(0, 0, 255, ${blue/MAX})` }}>Blue:</span>
          <Slider min={MIN} max={MAX} startingValue={blue_guess} onChange={b => setBlueGuess(b)}/>
        </div>
      </div>
      <button onClick={doGuess}>Guess</button>
    </div>
  );
}

export default App;
