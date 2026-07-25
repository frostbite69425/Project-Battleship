import elementFactory from "../utils/ui utils/elementFactory.utility.js";

function notificationBox(message, alertType) {
  const alertDiv = elementFactory("div", "alert-div alert-active");
  alertDiv.domElement.classList.add(alertType);
  const alertIcon = elementFactory("div", "alert-icon");
  alertIcon.domElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ffffff"><path d="M440-280h80v-240h-80v240Zm68.5-331.5Q520-623 520-640t-11.5-28.5Q497-680 480-680t-28.5 11.5Q440-657 440-640t11.5 28.5Q463-600 480-600t28.5-11.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;

  const alertMssg = elementFactory("div", "alert-text");

  const alertBtn = elementFactory("button", "alert-btn");

  alertBtn.domElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;

  alertMssg.insertText(message);
  alertDiv.domElement.append(
    alertIcon.domElement,
    alertMssg.domElement,
    alertBtn.domElement,
  );

  return alertDiv;
}

export default notificationBox;
