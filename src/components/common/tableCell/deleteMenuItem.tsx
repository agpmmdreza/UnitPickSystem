import {IResponse} from "api";
import clsx from "clsx";
import DropdownItem from "components/core/dropdownItem";
import {notify} from "components/core/toast";
import {useEffect} from "react";
import {useMutation} from "react-query";

//? cell that handles the deletion of cell

export interface IDeleteMenuItemProps<T> {
  rowId: number;
  mutationFn: (id: number) => Promise<IResponse<T>>;
  refetch?: () => void;
  setIsAlertOpen: (value: boolean) => void;
  setIsApproved: (value: boolean) => void;
  isApproved: boolean;
  deleteTitle?: string;
}
export function DeleteMenuItem<T>({
  mutationFn,
  refetch,
  rowId,
  isApproved,
  setIsApproved,
  setIsAlertOpen,
  deleteTitle,
}: IDeleteMenuItemProps<T>) {
  const { mutate, isLoading } = useMutation(mutationFn, {
    onMutate: () => {
      setIsApproved(false);
    },
    onSuccess: (data: IResponse<T>) => {
      notify.success(data.data.message || "");
      setIsAlertOpen(false);
      if (refetch) {
        refetch();
      }
    },
  });

  useEffect(() => {
    if (isApproved && !isLoading) {
      console.log(rowId);

      mutate(rowId);
    }
  }, [isApproved, isLoading, mutate, rowId]);

  return (
    <>
      <div className={clsx(["my-1"])}></div>
      <DropdownItem
        style={{ cursor: isLoading ? "wait" : "pointer" }}
        color="error"
        onClick={() => {
          console.log("delete action on row: " + rowId);
          //   mutate(rowId);
          setIsAlertOpen(true);
        }}
      >
        <span>{deleteTitle || "حذف"}</span>
      </DropdownItem>
    </>
  );
}
