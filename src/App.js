import React, { useReducer } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/body/Main';
import AppContext from './context/AppContext';
import './stylesheet/styles.scss';
//import { setPreciseInterval, clearPreciseInterval } from 'precise-interval';

function App() {
  const initialState = {
    breaklength: 5,
    sessionlength: 25,
    startTimer: false,
    timerType: 'Session',
    timer: 1500,
    timerInterval: '',
    breaktime: ''
  };

  const stateReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT_BREAK':
        return { ...state, breaklength: state.breaklength + 1 };
      case 'DECREMENT_BREAK':
        return { ...state, breaklength: state.breaklength - 1 };
      case 'INCREMENT_SESSION':
        return { ...state, sessionlength: state.sessionlength + 1 };
      case 'DECREMENT_SESSION':
        return { ...state, sessionlength: state.sessionlength - 1 };
      case 'INCREMENT_BREAK_TIMER':
        return { ...state, timer: action.timer };
      case 'DECREMENT_BREAK_TIMER':
        return { ...state, timer: action.timer };
      case 'INCREMENT_SESSION_TIMER':
        return { ...state, timer: action.timer };
      case 'DECREMENT_SESSION_TIMER':
        return { ...state, timer: action.timer };
      case 'SET_TIMER':
        return { ...state, startTimer: action.startTimer };
      case 'BEGIN_COUNTDOWN':
        return {
          ...state,
          timerInterval: action.timerInterval
        };
      case 'INCREMENT_TIMER':
        return { ...state, timer: state.timer + 1 };
      case 'DECREMENT_TIMER':
        return { ...state, timer: state.timer - 1 };
      case 'SWITCH_TIMER':
        return { ...state, timerType: action.timerType, timer: action.timer };
      case 'RESET_CLOCK':
        return {
          ...state,
          breaklength: 5,
          sessionlength: 25,
          startTimer: false,
          timerType: 'Session',
          timer: 1500,
          accInterval: '',
          breaktime: ''
        };
      default:
        return state;
    }
  };
  const [appState, dispatch] = useReducer(stateReducer, initialState);
  //const audioBuzzer = useRef();
  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      <div id='pomodoro-clock' className='App'>
        <Header />
        <Main />
        <Footer />
        <audio
          id='keysound'
          className='hidden'
          src='https://res.cloudinary.com/dzsmdyknz/video/upload/v1533087306/sample-swap/sfx-and-unusual-sounds/bleeps-blips-blonks-blarts-and-zaps/simpletone.mp3'
          //ref={}
        ></audio>
        <audio
          id='beep'
          preload='auto'
          className='hidden'
          src='https://res.cloudinary.com/dzsmdyknz/video/upload/v1536336611/sample-swap/sfx-and-unusual-sounds/electro-and-synthetic/clock_radio_alarm.mp3'
          //ref={audioBuzzer}
        ></audio>
      </div>
    </AppContext.Provider>
  );
}

export default App;
