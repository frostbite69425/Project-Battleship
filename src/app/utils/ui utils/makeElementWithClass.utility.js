const makeElementWithClass = (element, className) => {
  const domElement = document.createElement(element);
  const classes = className.split(" ");
  for (const cssClass of classes) {
    if (cssClass == " ") {
      return domElement;
    }
    domElement.classList.add(cssClass);
  }
  return domElement;
};

export default makeElementWithClass;
