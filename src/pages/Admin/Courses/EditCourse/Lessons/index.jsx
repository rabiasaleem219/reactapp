import { Box } from "@mui/material";
import { startFetchSections } from "actions/sections";
import Spinner from "components/common/Spinner";

import {
  initialState,
  sectionReducer,
} from "context/courseSections/sectionsReducer";
import { types } from "context/types/types";
import React, { useEffect, useReducer, useState } from "react";
import ModalFormSection from "./ModalFormSection";
import Sections from "./Sections";

const Lessons = ({ courseId }) => {
  //reducer para SECTIONS
  const [sections, dispatch] = useReducer(sectionReducer, initialState);

  //Fetch Sections
  useEffect(() => {
    const fetchSections = async () => {
      dispatch({ type: types.sectionStartFetch, payload: {} });
      const body = await startFetchSections(courseId);
      if (body.statusCode) {
        dispatch({ type: types.sectionFetchError, payload: body.message });
      } else {
        dispatch({
          type: types.sectionFetch,
          payload: body,
        });
      }
    };
    fetchSections();
  }, [courseId]);

  if (sections.Loading) return <Spinner />;

  return (
    //Container de toda la seccion
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Container del titulo */}
      <Box
        sx={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "text",
        }}
      >
        <span>Para agregar una seccion presione el boton</span>
      </Box>

      {/* contenedor para el boton de agregar seccion */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ModalFormSection dispatch={dispatch} courseId={courseId} />
      </Box>

      {/* Contenedor de todas las secciones (acordeones) */}
      <Box
        sx={{
          width: "90%",
          height: "500px",
          overflow: "auto",
          marginTop: "1rem",
        }}
      >
        {sections.sections.map((section, i) => {
          return (
            <Sections
              key={section.id}
              i={i + 1}
              text={section.name}
              sectionId={section.id}
              dispatchSection={dispatch}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Lessons;
