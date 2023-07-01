import { UserBold } from "components/icon";

interface Props {
  users: string[] | undefined;
}
const UserBox = ({ users }: Props) => {
  return (
    <div className="w-full h-full divide-y">
      <div className="w-full py-3 mx-2 h-fit">
        <p className=" text-2xl font-bold text-slate-800 m-0 p-0">لیست اعضا</p>
      </div>
      <div className="ml-6 mr-3 divide-y">
        {users?.map((user) => {
          return (
            <div className="w-full m-1 h-fit pt-2 pb-1 flex justify-start gap-2">
              <UserBold />
              <p className=" text-lg text-slate-800">{user}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default UserBox;
