import React from 'react';
import Clockswitches from './clockswitches/Clockswitches';
import CenterPanel from './panels/CenterPanel';
import LeftPanel from './panels/LeftPanel';
import RightPanel from './panels/RightPanel';

function Main() {
  return (
    <main id='App-body'>
      <section className='center-screen'>
        <LeftPanel />
        <CenterPanel />
        <RightPanel />
      </section>
      <Clockswitches />
    </main>
  );
}

export default Main;
