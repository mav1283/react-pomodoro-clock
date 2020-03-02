import React, { useContext } from 'react';
import AppContext from '../../../context/AppContext';
import { playClickSound } from '../../../utilities/utilities';

function RightPanel() {
  const { appState, dispatch } = useContext(AppContext);
  const { sessionlength, startTimer, timerType } = appState;

  const handleIncrement = () => {
    if (startTimer === false) {
      if (sessionlength !== 60) {
        if (timerType === 'Session') {
          dispatch({ type: 'INCREMENT_SESSION' });
          dispatch({
            type: 'INCREMENT_SESSION_TIMER',
            timer: sessionlength * 60 + 60
          });
        } else {
          dispatch({ type: 'INCREMENT_SESSION' });
        }
      }
    }
    playClickSound();
  };

  const handleDecrement = () => {
    if (startTimer === false) {
      if (sessionlength !== 1) {
        if (timerType === 'Session') {
          dispatch({ type: 'DECREMENT_SESSION' });
          dispatch({
            type: 'INCREMENT_SESSION_TIMER',
            timer: sessionlength * 60 - 60
          });
        } else {
          dispatch({ type: 'DECREMENT_SESSION' });
        }
      }
    }
    playClickSound();
  };

  return (
    <aside id='right-panel' className='panel aside-panel'>
      <label htmlFor='' className='panel-label'>
        Session Length
      </label>
      <div className='panel-screen'>
        <h3 className='editable-counter'>{sessionlength}</h3>
      </div>
      <div className='panel-controls'>
        <button onClick={handleDecrement} className='btn'>
          -
        </button>
        <button onClick={handleIncrement} className='btn'>
          +
        </button>
      </div>
    </aside>
  );
}

export default RightPanel;
