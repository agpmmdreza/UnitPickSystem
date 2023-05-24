import Page from "../../../../components/layout/page";
import Loader from "../../../../components/common/loader";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const SuperAdminDashboard = () => {
  // const { data, isError, isLoading } = useQuery([getNotifications.name], () =>
  //   getNotifications({
  //     page: 1,
  //     per_page: 10,
  //     index_type: ["unread"],
  //   })
  // );

  // const { data: messages } = useQuery([getAllMessages.name], () =>
  //   getAllMessages({
  //     per_page: 10,
  //     page: 1,
  //   })
  // );

  // const { data: dashboardData } = useQuery(getSuperDashboard.name, () =>
  //   getSuperDashboard()
  // );

  return (
    <Page title="داشبورد" type="main">
      <Loader isLoading={false} isError={false}></Loader>
    </Page>
  );
};
export default SuperAdminDashboard;
