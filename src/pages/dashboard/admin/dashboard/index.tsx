import Page from "components/layout/page";

import Loader from "components/common/loader";

function SuperAdminHomePage() {
  // const [tab, setTab] = useState(TAB_ITEMS[0].id);

  // const { data, isLoading, isError } = useQuery(
  //   "getSuperAdminDashboard",
  //   getSuperAdminDashboard
  // );

  // const responseData = data?.data.data;
  // console.log(responseData);

  // const getNotifsList = !!responseData?.notifications.length ? (
  //   <div className={clsx([classes.messagesContainer])}>
  //     {responseData?.notifications.map((item, index) => (
  //       <DashboardMessageCard
  //         key={index}
  //         dateTime={`${humanizedDate(item.updated_at)} - ${humanizedTime(
  //           item.updated_at
  //         )}`}
  //         email={item.sender_email}
  //         name={item.sender_name}
  //         onClick={() => notificationClickHandler(item.id)}
  //       />
  //     ))}
  //   </div>
  // ) : (
  //   <div
  //     className={clsx([
  //       "d-flex justify-content-center my-5 w-100",
  //       classes.noDataText,
  //     ])}
  //   >
  //     <div className="fw-bold">No Notification to Display</div>
  //   </div>
  // );

  // const getMessagesList = !!responseData?.messages.length ? (
  //   <div className={clsx([classes.messagesContainer])}>
  //     {responseData?.messages.map((item, index) => (
  //       <DashboardMessageCard
  //         key={index}
  //         dateTime={`${humanizedDate(item.updated_at)} - ${humanizedTime(
  //           item.updated_at
  //         )}`}
  //         email={item.sender_email}
  //         name={item.sender_name}
  //         onClick={() => messageClickHandler(item.sender_id)}
  //       />
  //     ))}
  //   </div>
  // ) : (
  //   <div
  //     className={clsx([
  //       "d-flex justify-content-center my-5 w-100",
  //       classes.noDataText,
  //     ])}
  //   >
  //     <div className="fw-bold">No Message to Display</div>
  //   </div>
  // );

  return (
    <Page title="داشبورد" type="main">
      <Loader isError={false} isLoading={false}></Loader>
    </Page>
  );
}

export default SuperAdminHomePage;
