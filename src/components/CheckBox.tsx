/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";

import { ListReducer } from "../reducers/list";

export interface CheckBoxProps {
  item: ListReducer;
  toggleComplete: () => void;
  color?: string;
}

export const checkBoxColor = {
  red: "#f44336",
  pink: "#e91e63",
  purple: "#9c27b0",
  deepPurple: "#673ab7",
  indigo: "#3f51b5",
  blue: "#2196f3",
  lightBlue: "#03a9f4",
  cyan: "#00bcd4",
  teal: "#009688",
  green: "#4caf50",
  lightGreen: "#8bc34a",
  lime: "#cddc39",
  yellow: "#ffeb3b",
  amber: "#ffc107",
  orange: "#ff9800",
  deepOrange: "#ff5722",
  blueGrey: "#607d8b",
};

// Cannot do the animation
const checkboxStyle = css`
  position: relative;

  width: 1rem;
  height: 1rem;
  margin-right: 0.75rem;

  cursor: pointer;
  appearance: none;
  outline: 0;

  &:before {
    content: "";

    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;

    width: 100%;
    height: 100%;

    transition: all 0.3s ease-in-out;
  }

  &:checked:before {
    height: 50%;

    transform: rotate(-45deg);

    border-top-style: none;
    border-right-style: none;
  }
`;

const CheckBox: React.SFC<CheckBoxProps> = ({
  item,
  toggleComplete,
  color,
}) => {
  return (
    <input
      type="checkbox"
      css={css`
        ${checkboxStyle}
        &::before {
          border: 2px solid ${color ? color : checkBoxColor.red};
        }
      `}
      onChange={toggleComplete}
      checked={item.isComplete}
    />
  );
};

export default CheckBox;
