document.addEventListener('init', () => {
  const homeButton = document.getElementById('home');
  const settingsButton = document.getElementById('settings');
  const aboutButton = document.getElementById('about');
  const content = document.getElementById('content');
  const openHomeButton = document.getElementById('openHome');
  const openSettingButton = document.getElementById('openSetting');
  const openAboutButton = document.getElementById('openAbout');
  const splitMenu = document.getElementById('splitMenu');
  let currentPage = '';

  const loadPage = (page) => {
    if (currentPage !== page) {
      content.load(`${page}.html`);
      currentPage = page;
    }
    splitMenu.close();
  };

  const loadHomePage = () => {
      loadPage('home');
  };

  const loadSettingsPage = () => {
      loadPage('settings');
  };

  const loadAboutPage = () => {
      loadPage('about');
  };

  // Asociar funciones de carga de páginas a los eventos de clic
  if (homeButton) {
      homeButton.addEventListener('click', loadHomePage);
  }

  if (settingsButton) {
      settingsButton.addEventListener('click', loadSettingsPage);
  }

  if (aboutButton) {
      aboutButton.addEventListener('click', loadAboutPage);
  }

  // Asociar función para abrir el menú lateral al hacer clic en el botón de menú en la barra de herramientas
  if (openHomeButton) {
      openHomeButton.addEventListener('click', () => {
          if (!splitMenu.isVisible) {
              splitMenu.open();
          }
      });
  }

  if (openSettingButton) {
      openSettingButton.addEventListener('click', () => {
          if (!splitMenu.isVisible) {
              splitMenu.open();
          }
      });
  }

  if (openAboutButton) {
      openAboutButton.addEventListener('click', () => {
          if (!splitMenu.isVisible) {
              splitMenu.open();
          }
      });
  }
});