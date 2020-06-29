import React, { useState, Dispatch } from "react";

import { TextField } from "@material-ui/core";
import { ListReducer } from "../../reducers/list";
import { getCurrentTimeInString } from "../utils";

import updateTaskActionCreator from "../../actionCreators/updateTaskActionCreator";
import { connect } from "react-redux";

export interface ModifyTaskProps {
  item: ListReducer;

  updateTask: (id: number, taskName: string, updatedTime: string) => void;
  toggleModify: () => void;
}

const ModifyTask: React.SFC<ModifyTaskProps> = ({
  item,
  updateTask,
  toggleModify,
}) => {
  const [newTaskName, setNewTaskName] = useState(item.taskName);
  const handleEnterOnInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdateTask(item.id);
    }
  };

  const handleUpdateTask = (id: number) => {
    updateTask(id, newTaskName, getCurrentTimeInString());
    toggleModify();
  };

  return (
    <div className="item-task-modify">
      <TextField
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        onKeyPress={handleEnterOnInput}
        label="Changed Task"
        fullWidth={true}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  updateTask: (id: number, taskName: string, updatedTime: string) =>
    dispatch(updateTaskActionCreator(id, taskName, updatedTime)),
});

export default connect(null, mapDispatchToProps)(ModifyTask);
