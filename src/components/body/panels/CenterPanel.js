import React, { useContext } from 'react';
import AppContext from '../../../context/AppContext';
import { leftPad } from '../../../utilities/utilities';

function CenterPanel() {
  const { appState } = useContext(AppContext);
  const { timer, timerType } = appState;
  const min = leftPad(Math.floor(timer / 60));
  const sec = leftPad(timer % 60);

  return (
    <div id='center-panel' className='panel'>
      <div className='clock-screen'>
        <label className='timer-label'>{timerType}</label>
        <h3 className='time-left'>
          {min}:{sec}
        </h3>
      </div>
    </div>
  );
}

export default CenterPanel;
