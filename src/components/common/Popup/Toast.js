import Swal from "sweetalert2";

const Toast = (icon, text) => {
  const toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    //   didOpen: (toast) => {
    //     toast.addEventListener("mouseenter", Swal.stopTimer);
    //     toast.addEventListener("mouseleave", Swal.resumeTimer);
    //   },
  });
  return toast.fire({
    icon: icon,
    title: text,
  });
};

export default Toast;
