import React, { useState, Dispatch } from "react";
import { connect } from "react-redux";

import { ListReducer } from "../../reducers/list";
import toggleCompleteActionCreator from "../../actionCreators/toggleCompleteActionCreator";
import deleteTaskActionCreator from "../../actionCreators/deleteTaskActionCreator";
import { Store } from "../../reducers";
import ModifyTask from "./ModifyTask";

import { getCurrentTimeInString } from "../utils";
import {
  TableRow,
  TableCell,
  Button,
  withStyles,
  Theme,
  createStyles,
  Tooltip,
  FormControl,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

export interface TaskProps {
  item: ListReducer;
  setComplete: (id: number, isComplete: boolean, updatedTime: string) => void;
  deleteTask: (id: number) => void;
}

const StyledTableCell = withStyles((theme: Theme) => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const Task: React.SFC<TaskProps> = ({ deleteTask, setComplete, item }) => {
  const [isModified, setIsModified] = useState(false);

  const handleDelete = (id: number) => {
    deleteTask(id);
  };

  const toggleComplete = (id: number, isComplete: boolean) => {
    setComplete(id, isComplete, getCurrentTimeInString());
  };

  const toggleModifyOff = () => {
    setIsModified(false);
  };

  const toggleModifyOn = () => {
    setIsModified(true);
  };

  return (
    <>
      <StyledTableRow>
        <StyledTableCell
          onDoubleClick={toggleModifyOn}
          style={{ cursor: "pointer", padding: "0.5rem" }}
        >
          {isModified ? (
            <ModifyTask item={item} toggleModify={toggleModifyOff} />
          ) : (
            <Tooltip title="Updated Task" placement="bottom-start">
              <div>{item.taskName}</div>
            </Tooltip>
          )}
        </StyledTableCell>
        <StyledTableCell>{item.createdDate}</StyledTableCell>
        <StyledTableCell>
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.isComplete}
                  onChange={() => toggleComplete(item.id, !item.isComplete)}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                />
              }
              label={item.isComplete ? "YEPPP :)" : "NAHH :("}
            ></FormControlLabel>
          </FormControl>
          {/* <CheckBox
            item={item}
            toggleComplete={() => toggleComplete(item.id, !item.isComplete)}
          /> */}
        </StyledTableCell>
        <StyledTableCell>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(item.id)}
          >
            Delete Task
          </Button>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

const mapStateToProps = (state: Store) => {
  return {
    list: state.todoList,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    setComplete: (id: number, isComplete: boolean, updatedTime: string) =>
      dispatch(toggleCompleteActionCreator(id, isComplete, updatedTime)),
    deleteTask: (id: number) => dispatch(deleteTaskActionCreator(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
