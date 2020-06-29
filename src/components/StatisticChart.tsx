import React, { useEffect, useRef } from "react";
import { Chart, ChartDataSets, ChartOptions } from "chart.js";
import { Store } from "../reducers";
import { connect } from "react-redux";
import { ListReducer } from "../reducers/list";
import { ChartType } from "./utils/ChartJsPlugins";

enum DefaultChartValue {
  DEFAULT_TASK_NUMBER = 1,
  DEFAULT_COMPLETE_TASK_NUMBER = 0,
  DEFAULT_COMPLETED_TASK_NUMBER = 1,
}

interface ChartData {
  date: string;
  taskNumber: number;
  completedTaskNumber: number;
}

export interface RenderTodoChartProps {
  todoList: ListReducer[];
}

const RenderTodoChart: React.SFC<RenderTodoChartProps> = ({ todoList }) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  const mapTodoToChartData = (todo: ListReducer): ChartData => ({
    date: todo.createdDate,
    completedTaskNumber: todo.isComplete
      ? DefaultChartValue.DEFAULT_COMPLETED_TASK_NUMBER
      : DefaultChartValue.DEFAULT_COMPLETE_TASK_NUMBER,
    taskNumber: DefaultChartValue.DEFAULT_TASK_NUMBER,
  });

  const getChartData = todoList.reduce((result: ChartData[], aTodo) => {
    const currentTask = result.find((todo) => todo.date === aTodo.createdDate);

    const taskComplete = aTodo.isComplete === true;

    if (currentTask) {
      currentTask.taskNumber++;

      if (taskComplete) {
        currentTask.completedTaskNumber++;
      }

      return result;
    }

    return [...result, mapTodoToChartData(aTodo)];
  }, []);

  const getLabelsData = (chartData: ChartData[]): string[] => {
    return chartData.map((data) => data.date.slice(0, 5));
  };

  const renderCreatedTasks = (chartData: ChartData[]): ChartDataSets => {
    return {
      data: chartData.map((data) => data.taskNumber),
      label: "Created Tasks",
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      fill: true,
      borderWidth: 2,
    };
  };

  const renderCompletedTasks = (chartData: ChartData[]): ChartDataSets => {
    return {
      data: chartData.map((data) => data.completedTaskNumber),
      label: "Completed Tasks",
      borderColor: "rgba(54, 162, 235, 1)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      fill: true,
      borderWidth: 2,
    };
  };

  const getDatasetsData = (chartData: ChartData[]): ChartDataSets[] => {
    return [renderCreatedTasks(chartData), renderCompletedTasks(chartData)];
  };

  const getOptionsData = (): ChartOptions => {
    return {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      responsive: true,
      maintainAspectRatio: false,
    };
  };
  // const renderChartFromData = (ctx: CanvasRenderingContext2D) => {

  // };

  const renderChart = () => {
    if (canvasEl?.current && todoList.length) {
      const ctx = canvasEl.current.getContext("2d");

      const chartData: ChartData[] = getChartData;

      if (ctx) {
        ctx.canvas.height = 300;

        return new Chart(ctx, {
          type: ChartType.LINE,
          data: {
            labels: getLabelsData(chartData),
            datasets: getDatasetsData(chartData),
          },
          options: getOptionsData(),
        });
      }
    }
  };

  useEffect(() => {
    const statisticChart = renderChart();

    return () => {
      statisticChart?.destroy();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getChartData]);

  return (
    <div className="Line-chart">
      {todoList.length > 0 ? (
        <div>
          <canvas ref={canvasEl}></canvas>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: Store) => {
  return {
    todoList: state.todoList,
  };
};

export default connect(mapStateToProps)(RenderTodoChart);

//Using React memo
// export default connect(mapStateToProps)(
//   React.memo(RenderChart, (prevProps: ChartProps, nextProps: ChartProps) => {
//     const { todoList: prevTotoList } = prevProps;
//     const { todoList: nextTotoList } = nextProps;

//     for (const key in prevTotoList) {
//       if (
//         prevTotoList.hasOwnProperty(key) &&
//         nextTotoList.hasOwnProperty(key)
//       ) {
//         const {
//           taskName: prevTaskName,
//           updatedTime: prevUpdatedTime,
//           ...prevRest
//         } = prevTotoList[key];
//         const {
//           taskName: nextTaskName,
//           updatedTime: nextUpdatedTime,
//           ...nextRest
//         } = nextTotoList[key];

//         return JSON.stringify(prevRest) === JSON.stringify(nextRest);
//       }
//     }
//     return false;
//   })
// );
