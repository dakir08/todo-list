import React, { useState, ChangeEvent } from "react";
import { connect } from "react-redux";

import { ListReducer } from "../../reducers/list";
import { Store } from "../../reducers";
import Tooltip from "../Tooltip";

import { Table, TableContainer, TablePagination } from "@material-ui/core";
import useStyled from "../styles/GeneralStyled";
import TodoListTableHeader from "./TodoListTableHeader";
import TodoListTableBody from "./TodoListTableBody";

export interface TodoListTableProps {
  list: ListReducer[];
}

const TodoListTable: React.FunctionComponent<TodoListTableProps> = ({
  list,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyled();

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };
  return (
    <>
      <Tooltip />
      <p>
        {list.length === 0
          ? "I can't find any task :("
          : `I got ${list.length} task${list.length > 1 ? "s" : ""}  `}
      </p>
      <TableContainer style={{ maxHeight: 440 }} className="Todo-list-table">
        <Table className={classes.TodoTable} stickyHeader>
          <TodoListTableHeader />
          <TodoListTableBody
            page={page}
            rowsPerPage={rowsPerPage}
            todoList={list}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 75, 100]}
        component="div"
        count={list.length}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
      ></TablePagination>
    </>
  );
};

const mapStateToProps = (state: Store) => {
  return {
    list: state.todoList,
  };
};

export default connect(mapStateToProps)(TodoListTable);
