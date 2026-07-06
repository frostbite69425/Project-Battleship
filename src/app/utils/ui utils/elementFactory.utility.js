import makeElementWithClass from "./makeElementWithClass.utility.js";

function elementFactory(elementType, className) {
  const domElement = makeElementWithClass(elementType, className);

  function insertText(text) {
    domElement.textContent = text;
  }

  function setChildren(...children) {
    domElement.append(children);
  }

  return { domElement, insertText, setChildren };
}

export default elementFactory;
