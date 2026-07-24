function dragStartHandler(ev, data = ev.target.dataset.shipType) {
  ev.dataTransfer.clearData();
  ev.dataTransfer.setData("text/plain", data);
  let orientation;
  if (ev.target.classList.contains("vertical-grid")) {
    orientation = "vertical";
  } else {
    orientation = "horizontal";
  }
  const coords = {
    xValue: ev.target.parentNode.dataset.xValue,
    yValue: ev.target.parentNode.dataset.yValue,
    orientation: orientation,
  };
  ev.dataTransfer.setData("custom-coords", JSON.stringify(coords));
}

export default dragStartHandler;
