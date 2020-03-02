export const leftPad = val => {
  if (val < 10) return `0${val}`;
  return `${val}`;
};

export const playClickSound = () => {
  const keysound = document.getElementById('keysound');
  keysound.currentTime = 0;
  keysound.play();
};

export const playBreakSound = () => {
  const keysound = document.getElementById('beep');
  keysound.currentTime = 0;
  keysound.play();
};
