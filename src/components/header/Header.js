import React from 'react';
import { IconContext } from 'react-icons';
import { FaReact } from 'react-icons/fa';

function Header() {
  return (
    <header id='App-header'>
      <h1>
        Pomodoro
        <span className='react'>
          Cl
          <IconContext.Provider value={{ className: 'react-icon' }}>
            <FaReact />
          </IconContext.Provider>
          ck
        </span>
      </h1>
      <p>Powered by React</p>
    </header>
  );
}

export default Header;
