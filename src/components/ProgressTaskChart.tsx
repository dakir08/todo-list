import React, { useRef, useEffect } from "react";

import Chart, { ChartDataSets, ChartData } from "chart.js";
import { doughnutChartText, ChartType } from "./utils/ChartJsPlugins";
import { Store } from "../reducers";
import { connect } from "react-redux";
import { ListReducer } from "../reducers/list";
import { getCurrentDateInString } from "./utils";
import { Divider } from "@material-ui/core";

export interface ProgressTaskProps {
  todoList: ListReducer[];
}

const ProgressTask: React.SFC<ProgressTaskProps> = ({ todoList }) => {
  let canvasEl = useRef<HTMLCanvasElement>(null);

  const labels = ["Completed Tasks", "Remaining Tasks"];

  const todayTask = todoList.filter(
    (aTodo) => aTodo.createdDate === getCurrentDateInString()
  ).length;

  const completedTasks = todoList.filter(
    (aTodo) =>
      aTodo.createdDate === getCurrentDateInString() &&
      aTodo.isComplete === true
  ).length;

  const remainingTasks =
    todoList.filter((aTodo) => aTodo.createdDate === getCurrentDateInString())
      .length - completedTasks;

  const renderChart = () => {
    const ctx = canvasEl.current?.getContext("2d");

    const getTaskProgressPercent = () => {
      return todoList.length
        ? `${((completedTasks / todayTask) * 100).toFixed(2)}%`
        : "";
    };

    const getTaskProgressColor = (): string => {
      const taskProgressPercentString = getTaskProgressPercent();

      const taskProgressPercent = +taskProgressPercentString.substring(
        0,
        taskProgressPercentString.length - 1
      );

      switch (true) {
        case taskProgressPercent === 100:
          return "rgba(75, 192, 192, 1)";
        case taskProgressPercent >= 80:
          return "rgba(54, 162, 235, 1)";
        case taskProgressPercent >= 50:
          return "rgba(255, 206, 86, 1)";
        default:
          return "rgba(255, 99, 132, 1)";
      }
    };

    const datasets: ChartDataSets[] = [
      {
        data: [completedTasks, remainingTasks],
        backgroundColor: [getTaskProgressColor(), "rgba(0, 0, 0, 0.3)"],
      },
    ];

    const getDataChart = (): ChartData => ({
      labels,
      datasets,
    });

    if (todayTask)
      return new Chart(ctx!, {
        type: ChartType.DOUGHNUT,
        data: getDataChart(),
        options: {
          center: doughnutChartText({
            text: getTaskProgressPercent(),
            minFontSize: 15,
          }),
        },
      });
  };

  useEffect(() => {
    const progressChart = renderChart();

    return () => {
      if (todayTask) progressChart!.destroy();
    };
  }, [completedTasks, remainingTasks]);

  return (
    <div className="Progress Chart" style={{ width: "100%", height: "100%" }}>
      {todayTask > 0 ? (
        <>
          {" "}
          <canvas ref={canvasEl}></canvas>
          <Divider style={{ margin: "1rem 0rem" }} variant="fullWidth" />
          <div style={{ textAlign: "center" }}>
            {remainingTasks === 0
              ? `Great Work :). No more task today. Time to get a bong and chill :D`
              : `You have ${remainingTasks} tasks to do :), keep working`}
          </div>
        </>
      ) : (
        "Oops, sounds like you haven't created any tasks today :("
      )}
    </div>
  );
};

const mapStateToProps = ({ todoList }: Store) => {
  return {
    todoList,
  };
};

export default connect(mapStateToProps)(ProgressTask);
