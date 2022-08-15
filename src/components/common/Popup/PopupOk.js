import Swal from "sweetalert2";

const PopupOk = (width, icon, text) => {
  return Swal.fire({
    position: "center",
    width: width,
    heightAuto: true,
    icon: icon,
    title: text,
    showConfirmButton: false,
    timer: 1500,
  });
};

export default PopupOk;
