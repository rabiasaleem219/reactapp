import { useState } from "react";
import { Box } from "@mui/material";
import { Dialog } from "primereact/dialog";

import AddIcon from "@mui/icons-material/Add";
import { MainButton } from "components/common/Buttons/MainButton/styles";
import { BasicSwitch } from "components/common/SwitchButton";
import Formlessons from "../FormLessons";
import FormQuizes from "../FormQuizes";
import {
  SelectedSwitchTextLeft,
  SelectedSwitchTextRight,
  SelectSwitch,
} from "./styles";

const ModalForm = ({ sectionId, dispatchLessons, dispatchQuizzes }) => {
  //*** Modal */
  const [display, setDisplay] = useState(false);
  const onClick = () => {
    setDisplay(true);
  };
  const onHide = () => {
    setDisplay(false);
  };
  //*** Switch */
  const [switchStatus, setSwitchStatus] = useState(false);
  const handleSwitch = (e) => {
    setSwitchStatus(e.target.checked);
  };
  return (
    <>
      <MainButton
        width="35px"
        height="33px"
        fontSize="1rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        shadow="1px 1px 10px 0px rgb(0, 0, 0, 0.5)"
        onClick={() => {
          onClick();
        }}
      >
        <AddIcon />
      </MainButton>

      <Dialog
        header="Agregar Quiz o Clase"
        visible={display}
        contentStyle={{ borderRadius: " 0 0 10px 10px", overflow: "auto" }}
        style={{ width: "65vw" }}
        onHide={() => onHide()}
        resizable={false}
        draggable={false}
      >
        <SelectSwitch>
          <SelectedSwitchTextLeft status={switchStatus}>
            Clase
          </SelectedSwitchTextLeft>
          <BasicSwitch onChange={handleSwitch} checked={switchStatus} />
          <SelectedSwitchTextRight status={switchStatus}>
            Quiz
          </SelectedSwitchTextRight>
        </SelectSwitch>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "10px 0",
          }}
        >
          {!switchStatus ? (
            <Formlessons
              sectionId={sectionId}
              setDisplay={setDisplay}
              dispatch={dispatchLessons}
            />
          ) : (
            <FormQuizes
              sectionId={sectionId}
              setDisplay={setDisplay}
              dispatch={dispatchQuizzes}
            />
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default ModalForm;
