import { useFormikContext } from "formik";
import { ErrorMessage, TextAreaContainer, TextAreaItem } from "./styles";

const Textarea = ({
  id,
  name,
  placeholder,
  padding,
  width,
  heigth,
  margin,
}) => {
  const { values, errors, touched, setTouched, handleChange, handleBlur } =
    useFormikContext();
  const value = values[name] ? values[name] : "";
  const error = errors[name] ? errors[name] : "";
  const touchedInput = touched[name] ? touched[name] : "";
  return (
    <TextAreaContainer>
      <TextAreaItem
        // Atributos input
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        onBlur={handleBlur}
        autoComplete="off"
        onClick={() => setTouched({ ...touched, [name]: true })}
        onTouchStart={() => setTouched({ ...touched, [name]: true })}
        // Props de estilos
        padding={padding}
        width={width}
        heigth={heigth}
        margin={margin}
      />
      {error && touchedInput && <ErrorMessage>{error}</ErrorMessage>}
    </TextAreaContainer>
  );
};

export default Textarea;
