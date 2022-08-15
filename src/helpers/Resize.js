import { useEffect, useState } from "react";
// Esta funcion es para poder capturar el tamaño actual de la pantalla en tiempo real
const Resize = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      const width = document.body.clientWidth;
      setWidth(width);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);
  return width;
};

export default Resize;
