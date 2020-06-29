import React from "react";
import styled from "@emotion/styled/macro";

export interface TooltipProps {}

const Span = styled.span`
  visibility: hidden;
  width: 200px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
`;

const STooltip = styled.div`
  position: relative;
  display: inline-block;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  :hover {
    ${Span} {
      visibility: visible;
    }
  }
`;

const Tooltip: React.SFC<TooltipProps> = () => {
  return (
    <>
      <STooltip>
        Show Tips
        <Span>
          Tips: Double click on <b>Task Name</b> to modify the task
        </Span>
      </STooltip>
    </>
  );
};

export default Tooltip;
