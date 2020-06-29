import React from "react";
import TodoSubmitForm from "./TodoSubmitForm";
import TodoListTable from "./TodoListTable/TodoListTable";
import clsx from "clsx";

//Material UI

import { Grid, Paper } from "@material-ui/core";

//Components
import useStyled from "./styles/GeneralStyled";
import RenderTodoChart from "./StatisticChart";
import Title from "./Title";
import ProgressTask from "./ProgressTaskChart";
import ContainerBoard from "./ContainerBoard";

export interface TodoListAppProps {}

const TodoListApp: React.SFC<TodoListAppProps> = () => {
  const classes = useStyled();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <ContainerBoard>
      <h1>Good Evening, Max!</h1>
      <h3>Time to get a bong now :D</h3>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={8}>
          <Paper className={fixedHeightPaper}>
            <Title>Chart</Title>
            <RenderTodoChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <Title>Today Progress</Title>
            <ProgressTask />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>Todo List</Title>
            <TodoSubmitForm />
            <TodoListTable />
          </Paper>
        </Grid>
      </Grid>
    </ContainerBoard>
  );
};

export default TodoListApp;
