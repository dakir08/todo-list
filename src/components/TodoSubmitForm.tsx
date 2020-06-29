import React, { useState, Dispatch } from "react";
import { connect } from "react-redux";

//Component
import listActionCreators from "../actionCreators/listActionCreator";
import { Store } from "../reducers";
import { ListReducer } from "../reducers/list";
import { getCurrentTimeInString, getCurrentDateInString } from "./utils";

//Material UI
import { Button, Input } from "@material-ui/core";

type Props = {
  addNewTask: (
    id: number,
    taskName: string,
    currentTime: string,
    currentDate: string
  ) => void;
  list: ListReducer[];
};

const TodoSubmitForm: React.FC<Props> = ({ addNewTask }) => {
  const [taskName, setTaskName] = useState("");

  const addTask = () => {
    if (taskName) {
      addNewTask(
        Date.now(),
        taskName,
        getCurrentTimeInString(),
        getCurrentDateInString()
      );
      setTaskName("");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTask();
      }}
    >
      <Input
        value={taskName}
        onChange={(e) => {
          setTaskName(e.currentTarget.value);
        }}
        placeholder="Insert your new task here"
        style={{ width: "80%" }}
      />
      <Button variant="contained" color="primary" type="submit">
        Submit Task
      </Button>
    </form>
  );
};

//
const mapStateToProps = (state: Store) => {
  return { list: state.todoList };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  addNewTask: (
    id: number,
    taskName: string,
    currentTime: string,
    currentDate: string
  ) => dispatch(listActionCreators(id, taskName, currentTime, currentDate)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoSubmitForm);
