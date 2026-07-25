import notificationBox from "../../components/notification.component.js";

const notification = (message, alertType = "warning") => {
  const content = document.querySelector(".content");
  const alert = notificationBox(message, alertType);

  content.appendChild(alert.domElement);

  const alertBtn = document.querySelector(".alert-btn");

  alertBtn.addEventListener("click", () => {
    content.removeChild(alert.domElement);
  });

  const timeout = setTimeout(() => {
    if (content.contains(alert.domElement)) {
      content.removeChild(alert.domElement);
    }
  }, 3000);
};

export default notification;
