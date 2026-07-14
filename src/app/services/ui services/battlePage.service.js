const battlePage = (game) => {
  const content = document.querySelector(".content");
  while (content.lastChild) {
    content.removeChild(content.firstChild);
  }
};

export default battlePage;
