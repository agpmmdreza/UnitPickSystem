import Button from "components/core/button";
import {useHistory} from "react-router";

export interface IRegistrationButtonProps {
  title: string;
  search?: string;
  className?: string;
  pathname?: string;
}

//? Returns the registration button

export default function RegistrationButton({
  title,
  search,
  className,
  pathname,
}: IRegistrationButtonProps) {
  const history = useHistory();
  return (
    <Button
      className={className}
      onClick={() =>
        history.push({
          pathname: `${
            !!pathname ? pathname : history.location.pathname
          }/create`,
          search: search,
        })
      }
    >
      {title}
    </Button>
  );
}
