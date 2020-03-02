import React, { useContext, useCallback, useEffect } from 'react';
import { FaPlay, FaPause, FaRedoAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import AppContext from '../../../context/AppContext';
import { setPreciseInterval, clearPreciseInterval } from 'precise-interval';
import { playClickSound, playBreakSound } from '../../../utilities/utilities';

var decrementTimerInterval;

function Clockswitches() {
  const { appState, dispatch } = useContext(AppContext);
  const { startTimer, timer, timerType, breaklength, sessionlength } = appState;

  //const decrementTimerInterval = useRef();

  const beginCountDown = useCallback(() => {
    decrementTimerInterval = setPreciseInterval(
      () => dispatch({ type: 'DECREMENT_TIMER' }),
      1000
    );
    dispatch({
      type: 'BEGIN_COUNTDOWN',
      timerInterval: decrementTimerInterval
    });
  }, [dispatch]);

  const switchTimer = useCallback(
    (timerLength, timerType) => {
      dispatch({
        type: 'SWITCH_TIMER',
        timerType: timerType,
        timer: timerLength
      });
    },
    [dispatch]
  );

  useEffect(() => {
    function checkTimerStatus() {
      return new Promise((resolve, reject) => {
        let wait = setTimeout(() => {
          if (timerType === 'Session') {
            clearPreciseInterval(decrementTimerInterval);
            switchTimer(breaklength * 60, 'Break');
          } else if (timerType === 'Break') {
            clearPreciseInterval(decrementTimerInterval);
            switchTimer(sessionlength * 60, 'Session');
          }
          document.getElementById('pomodoro-clock').classList.add('shakeme');
          clearTimeout(wait);
          resolve('switch timer');
        }, 0);
      });
    }

    function executeBreaktime() {
      return new Promise((resolve, reject) => {
        let wait = setTimeout(() => {
          playBreakSound();
          clearTimeout(wait);
          resolve('shake the app');
        }, 100);
      });
    }

    function startNewTimer() {
      return new Promise((resolve, reject) => {
        let wait = setTimeout(() => {
          beginCountDown();
          document.getElementById('pomodoro-clock').classList.remove('shakeme');
          resolve('start new timer');
          clearTimeout(wait);
        }, 0);
      });
    }

    async function timerSequence() {
      const step_one = await checkTimerStatus();
      console.log(step_one);
      const step_two = await executeBreaktime();
      console.log(step_two);
      const step_three = await startNewTimer();
      console.log(step_three);
    }

    if (timer === 0) {
      timerSequence();
    }
  }, [
    timer,
    beginCountDown,
    breaklength,
    sessionlength,
    switchTimer,
    timerType
  ]);

  useEffect(() => {
    if (startTimer === false) {
      clearPreciseInterval(decrementTimerInterval);
    } else {
      beginCountDown();
    }
  }, [startTimer, beginCountDown]);

  const handleReset = () => {
    dispatch({ type: 'RESET_CLOCK' });
    clearInterval(decrementTimerInterval);
    playClickSound();
  };

  const handlePlayPause = () => {
    if (startTimer === false) {
      dispatch({ type: 'SET_TIMER', startTimer: true });
    } else if (startTimer === true) {
      dispatch({ type: 'SET_TIMER', startTimer: false });
      clearPreciseInterval(decrementTimerInterval);
    }
    playClickSound();
  };

  return (
    <section id='clock-switches'>
      <IconContext.Provider value={{ className: 'btn-icon' }}>
        <button onClick={handlePlayPause} className='btn flex-btn'>
          <FaPlay /> play / <FaPause />
          pause
        </button>
      </IconContext.Provider>
      <IconContext.Provider value={{ className: 'btn-icon' }}>
        <button onClick={handleReset} className='btn flex-btn'>
          <FaRedoAlt /> reset
        </button>
      </IconContext.Provider>
    </section>
  );
}

export default Clockswitches;
