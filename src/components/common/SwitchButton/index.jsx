import * as React from "react";
import clsx from "clsx";
import { styled } from "@mui/system";
import { useSwitch } from "@mui/base/SwitchUnstyled";

const blue = {
  500: "#37B2CF",
};

const grey = {
  400: "#5e82be",
  500: "#5e82be",
  600: "#5e82be",
};

const BasicSwitchRoot = styled("span")(
  ({ theme }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  margin: 10px 1.5rem;
  background: ${theme.palette.mode === "dark" ? grey[600] : grey[400]};
  border-radius: 50px;
  cursor: pointer;

  &.Switch-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.Switch-checked {
    background: ${blue[500]};
  }
  `
);

const BasicSwitchInput = styled("input")`
  cursor: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
`;

const BasicSwitchThumb = styled("span")`
  display: block;
  width: 20px;
  height: 20px;
  top: 5px;
  left: 7px;
  border-radius: 16px;
  background-color: #fff;
  position: relative;
  transition: all 200ms ease;

  &.Switch-focusVisible {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.Switch-checked {
    left: 32px;
    top: 5px;
    background-color: #fff;
  }
`;

export function BasicSwitch(props) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    "Switch-checked": checked,
    "Switch-disabled": disabled,
    "Switch-focusVisible": focusVisible,
  };

  return (
    <BasicSwitchRoot className={clsx(stateClasses)}>
      <BasicSwitchThumb className={clsx(stateClasses)} />
      <BasicSwitchInput {...getInputProps()} />
    </BasicSwitchRoot>
  );
}
