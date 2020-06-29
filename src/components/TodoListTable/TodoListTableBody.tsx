import React from "react";
import { TableBody } from "@material-ui/core";
import { ListReducer } from "../../reducers/list";
import TodoTaskFromTable from "./TodoTaskFromTable";

export interface TodoListTableBodyProps {
  page: number;
  rowsPerPage: number;
  todoList: ListReducer[];
}

const TodoListTableBody: React.SFC<TodoListTableBodyProps> = ({
  page,
  rowsPerPage,
  todoList,
}) => {
  return (
    <TableBody>
      {todoList
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item) => (
          <TodoTaskFromTable item={item} key={item.id} />
        ))}
    </TableBody>
  );
};

export default TodoListTableBody;
