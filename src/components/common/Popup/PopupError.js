import Swal from "sweetalert2";

const PopupError = (body) => {
  return Swal.fire({
    icon: "error",
    title: "Error!",
    text: body,
    confirmButtonText: "Ok",
    confirmButtonColor: "#5373b2",
    timer: 2500,
  });
};

export default PopupError;
