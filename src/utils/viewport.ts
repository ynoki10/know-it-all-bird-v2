const setVhCssVar = () => {
  const setVh = () => {
    const windowHeight = window.innerHeight;
    document.documentElement.style.setProperty('--vh-full', `${windowHeight}px`);
  };

  let vw = window.innerWidth;

  window.addEventListener('resize', () => {
    if (vw === window.innerWidth) {
      return;
    }

    vw = window.innerWidth;
    setVh();
  });

  setVh();
};

export default setVhCssVar;
