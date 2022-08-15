import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { ErrorMessage, InputContainer, InputItem } from "../Inputs/styles";
import { useFormikContext } from "formik";

const Selects2 = (props) => {
  const { options, previousValue, text } = props;
  //! "props" son todos los datos correspondientes del input
  //! "options" son los datos que se mostraran en el dropdown. DEBE SER UN ARRAY DE OBJETOS
  //! "previusValue" es el valor que contenga el dropdown al renderizar (si lo tenia)
  //! "text" es el texto que se mostrara en el dropdown cuando no haya ningun valor seleccionado
  //?  id, name, type, padding, width, heigth, margin, color, backgroundColor, alignItems,errorPadding, inheritValue,

  //*** Select values ***/
  const [selectedOption, setSelectedOption] = useState(previousValue);
  const onOptionChange = (e) => {
    setSelectedOption(e.value);
  };

  // if (previousValue) {
  //   setSelectedOption(previousValue);
  // }

  const selectedOptionTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };
  const optionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.name}</div>
      </div>
    );
  };

  //*** Input escondido ***/
  const { values, errors, touched, setTouched, handleChange, handleBlur } =
    useFormikContext();

  selectedOption
    ? (values[props.name] = selectedOption.name)
    : (values[props.name] = "");

  const value = values[props.name] ? values[props.name] : "";
  const error = errors[props.name] ? errors[props.name] : "";
  const touchedInput = touched[props.name] ? touched[props.name] : "";

  return (
    <>
      <Dropdown
        value={selectedOption}
        options={options}
        onChange={onOptionChange}
        optionLabel="name"
        showClear
        filterBy="name"
        placeholder={previousValue ? previousValue : text}
        valueTemplate={selectedOptionTemplate}
        itemTemplate={optionTemplate}
        style={{
          width: props.width ? props.width : "75%",
          heigth: props.heigth ? props.heigth : "50px",
          margin: props.margin ? props.margin : "10px 0px",
          padding: props.padding ? props.padding : "0px 15px",
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : "#fff",
          border: "none",
          borderRadius: "45px",
          alignSelf: props.alignSelf ? props.alignSelf : "center",
          boxShadow: "none",
          color: props.color ? props.color : "#000",
        }}
      />

      {/* Ejemplo de lo que necesita el input para funcionar */}

      {/* <Input
        id="country"
        name="country"
        type="hidden"
        inheritValue={selectedOption}
      ></Input> */}

      {/* INPUT QUE RECOJE LOS DATOS */}

      <InputContainer
        // Atributos input
        width="0%"
        alignItems={props.alignItems}
      >
        <InputItem
          // Atributos input
          id={props.id}
          name={props.name}
          type="text"
          display="none"
          width="0px"
          height="0px"
          margin="0px"
          // variables de formikContext
          onChange={handleChange}
          value={value}
          onBlur={handleBlur}
          autoComplete="off"
          onClick={() => setTouched({ ...touched, [props.name]: true })}
          onTouchStart={() => setTouched({ ...touched, [props.name]: true })}
          // Props de estilos
        />
        {error && touchedInput && (
          <ErrorMessage errorPadding={props.errorPadding}>{error}</ErrorMessage>
        )}
      </InputContainer>
    </>
  );
};

export default Selects2;
