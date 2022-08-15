import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";

import { ButtonContainer } from "../style";
import { MainButton } from "../../../../components/common/Buttons/MainButton/styles";
import Input from "../../../../components/common/Forms/Inputs";
import InputButton from "../../../../components/common/Forms/FormButton";
import { Container, Modal, TableContainer, Title } from "./styles";
import {
  startCreate,
  startDelete,
  startFetchCategories,
} from "actions/categories";
import { startChecking } from "actions/auth";
import { types } from "context/types/types";
import Toast from "components/common/Popup/Toast";
import { handleRows } from "data/categories";

const CreateCategory = () => {
  //**** Modal ****/
  const [visible, setVisible] = useState(false);

  const click = () => {
    setVisible(true);
  };
  const close = () => {
    setVisible(false);
  };

  const onHide = () => {
    setVisible(false);
  };
  //**** Formik ****/
  const INITIAL_VALUES = {
    title: "",
  };
  const VALIDATION_SCHEMA = yup.object({
    title: yup
      .string()
      .required("Escriba una categoria")
      .min(4, "El titulo debe tener al menos 4 caracteres")
      .max(50, "El titulo debe tener máximo 50 caracteres"),
  });

  const dispatch = useDispatch();
  const onSubmit = async (values, { resetForm }) => {
    await dispatch(startChecking());
    const res = await dispatch(startCreate(values));
    console.log(res);
    if (res.type === types.categoriesCreateError) {
      Toast("error", res.payload);
      resetForm();
    } else {
      Toast("success", "Categoria creada correctamente");
      resetForm();
    }
  };
  //**** Data table ****/
  //! Extraemos las categorias del estado
  const { categories } = useSelector((state) => state.categories);
  const rows = handleRows(categories);
  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "name", headerName: "Name", width: 150 },
  ];
  // * columnss es un array de objetos. Debe poser un field, headername y width para que funcione
  //* columns tambien puede tener: type, description, sortable(boolean) etc
  // ? ejemplo columns = [{ field: "id", headerName: "ID", width: 70 },...]
  const [idSelect, setIdSelect] = useState([]);

  const handleDelete = async (id) => {
    //Identifico cuales son las categories seleccionadas en la tabla
    // filtrar categorias seleccionadas
    const categoriesSelected = [];

    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < id.length; j++) {
        if (rows[i].id === id[j]) {
          categoriesSelected.push(rows[i].name);
        }
      }
    }

    const categoriesToDelete = [];

    for (let i = 0; i < categories.length; i++) {
      for (let j = 0; j < categoriesSelected.length; j++) {
        if (categories[i].title === categoriesSelected[j]) {
          categoriesToDelete.push(categories[i].id);
        }
      }
    }

    if (categoriesToDelete.length !== 0) {
      await dispatch(startChecking());
      const res = await dispatch(startDelete(categoriesToDelete));
      if (res.type === types.categoriesDeleteError) {
        Toast("error", res.payload);
      } else {
        Toast("success", "Categoria eliminada correctamente");
        setIdSelect([]);
        dispatch(startFetchCategories());
      }
    } else {
      Toast("error", "Selecciona al menos una categoria");
    }
  };
  // console.log(idSelect);
  // console.log(rows);
  return (
    <>
      <MainButton
        margin="0 5px 0 5px"
        justifyContent="flex-end"
        onClick={() => click()}
      >
        Categorias
      </MainButton>
      <Modal>
        <Dialog
          header="Crear Categoria"
          visible={visible}
          style={{
            width: "40vw",
            margin: "50px 0px 0 0",
          }}
          position="center"
          contentStyle={{
            borderRadius: "15px",
            overflowY: "hidden",
          }}
          draggable={false}
          showHeader={false}
          resizable={false}
          className="dialog"
          onHide={() => onHide()}
        >
          <ButtonContainer>
            <MainButton
              backgroundColor="rgb(255, 255, 255)"
              backgroundColorHover="rgb(7, 7, 7, 0.1)"
              height="32px"
              width=" 32px"
              padding="5px 0 0 0"
              margin="1rem 0rem 0rem 0rem"
              color="#292929"
              onClick={() => close()}
            >
              <CloseIcon />
            </MainButton>
          </ButtonContainer>
          <Title>CATEGORIAS</Title>
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={VALIDATION_SCHEMA}
            onSubmit={onSubmit}
          >
            <Form>
              <Container>
                <Input
                  id={"title"}
                  name={"title"}
                  type={"text"}
                  placeholder={"Nombre de la categoria"}
                  color="#1a1a1a"
                  errorPadding="0 0 0 calc(100% - 87%)"
                />
                <InputButton
                  text={"Agregar"}
                  width="30%"
                  height="40px"
                  fontSize="0.9rem"
                  margin="2rem 0 0 0 "
                />
              </Container>
            </Form>
          </Formik>
          <TableContainer>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(newSelectionModel) => {
                  setIdSelect(newSelectionModel);
                }}
                selectionModel={idSelect}
              />
            </div>
            <MainButton
              backgroundColor="#ff555b"
              margin="5px 0 0 0"
              width="25%"
              height="40px"
              fontSize="0.9rem"
              onClick={() => handleDelete(idSelect)}
            >
              Borrar{" "}
            </MainButton>
          </TableContainer>
        </Dialog>
      </Modal>
    </>
  );
};

export default CreateCategory;
