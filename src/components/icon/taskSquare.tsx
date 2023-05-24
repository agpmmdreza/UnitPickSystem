import {ReactComponent as TaskLinearSVG} from "assets/icons/linear/task-square-linear.svg";

function TaskLinear(props: { [key: string]: any }) {
  return <TaskLinearSVG data-variant="linear" {...props} />;
}

export { TaskLinear };
