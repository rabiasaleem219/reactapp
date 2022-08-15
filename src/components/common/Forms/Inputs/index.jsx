import { useFormikContext } from "formik";
import { ErrorMessage, InputContainer, InputItem } from "./styles";

const Input = ({
  i,
  id,
  name,
  type,
  placeholder,
  padding,
  width,
  heigth,
  margin,
  color,
  backgroundColor,
  alignItems,
  errorPadding,
  inheritValue,
  radioValue,
  setRadioValue = false,
}) => {
  const { values, errors, touched, setTouched, handleChange, handleBlur } =
    useFormikContext();
  if (inheritValue) {
    values[name] = inheritValue.name;
  }
  const value = values[name] ? values[name] : "";
  const error = errors[name] ? errors[name] : "";
  const touchedInput = touched[name] ? touched[name] : "";

  if (setRadioValue) {
    setRadioValue(value);
  }
  return (
    <InputContainer
      // Atributos input
      alignItems={alignItems}
      width={width}
    >
      <InputItem
        // Atributos input
        id={id}
        name={name}
        type={type}
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
        color={color}
        backgroundColor={backgroundColor}
      />
      {error && touchedInput && (
        <ErrorMessage errorPadding={errorPadding}>{error}</ErrorMessage>
      )}
    </InputContainer>
  );
};

export default Input;
