import React, { useContext } from 'react';
import AppContext from '../../../context/AppContext';
import { playClickSound } from '../../../utilities/utilities';

function LeftPanel() {
  const { appState, dispatch } = useContext(AppContext);
  const { breaklength, startTimer, timerType } = appState;

  const handleIncrement = () => {
    if (startTimer === false) {
      if (breaklength !== 60) {
        if (timerType === 'Break') {
          dispatch({ type: 'INCREMENT_BREAK' });
          dispatch({
            type: 'DECREMENT_BREAK_TIMER',
            timer: breaklength * 60 + 60
          });
        } else {
          dispatch({ type: 'INCREMENT_BREAK' });
        }
      }
    }
    playClickSound();
  };

  const handleDecrement = () => {
    if (startTimer === false) {
      if (breaklength !== 1) {
        if (timerType === 'Break') {
          dispatch({ type: 'DECREMENT_BREAK' });
          dispatch({
            type: 'DECREMENT_BREAK_TIMER',
            timer: breaklength * 60 - 60
          });
        } else {
          dispatch({ type: 'DECREMENT_BREAK' });
        }
      }
    }
    playClickSound();
  };

  return (
    <aside id='left-panel' className='panel aside-panel'>
      <label htmlFor='' className='panel-label'>
        Break Length
      </label>
      <div className='panel-screen'>
        <h3 className='editable-counter'>{breaklength}</h3>
      </div>
      <div className='panel-controls'>
        <button onClick={handleDecrement} className='btn panel-btn'>
          -
        </button>
        <button onClick={handleIncrement} className='btn panel-btn'>
          +
        </button>
      </div>
    </aside>
  );
}

export default LeftPanel;
