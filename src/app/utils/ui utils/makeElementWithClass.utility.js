const makeElementWithClass = (element, ...className) => {
  const domElement = document.createElement(element);
  const classes = className.join(", ");
  domElement.classList.add(classes);
  return domElement;
};

export default makeElementWithClass;
