import { store } from "react-notifications-component";
const CreateNoti = ({ title, msg, component, type }) => {
  if (component === null) {
    store.addNotification({
      title,
      message: msg,
      type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
        showIcon: true,
      },
    });
  } else {
    store.addNotification({
      title,
      message: msg,
      type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
        showIcon: true,
      },
    });
  }
};
export default CreateNoti;
