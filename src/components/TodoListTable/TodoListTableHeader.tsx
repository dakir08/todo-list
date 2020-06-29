import React from "react";
import {
  TableHead,
  withStyles,
  Theme,
  TableCell,
  TableRow,
} from "@material-ui/core";

export interface TodoListTableHeaderProps {}

const StyledTableCell = withStyles((theme: Theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);

const TodoListTableHeader: React.SFC<TodoListTableHeaderProps> = () => {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell style={{ width: "40%" }}>Task Name</StyledTableCell>
        <StyledTableCell style={{ width: "20%" }}>Created Date</StyledTableCell>
        <StyledTableCell style={{ width: "20%" }}>
          Complete Status
        </StyledTableCell>
        <StyledTableCell style={{ width: "20%" }}>Delete Task</StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

export default TodoListTableHeader;
