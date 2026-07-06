const toggleElementClass = (className, ...elements) => {
  for (const element of elements) {
    element.classList.toggle(className);
  }
};

export default toggleElementClass;
