import Page from "../../../../components/layout/page";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "react-query";
import { getTodayCourses } from "api/courses";

const PatientDashboard = () => {
  return (
    <Page title="داشبورد" type="main">
      <Swiper
        navigation={false}
        freeMode={true}
        spaceBetween={20}
        slidesPerView={"auto"}
        modules={[FreeMode]}
        centeredSlides={false}
      >
        <SwiperSlide></SwiperSlide>
      </Swiper>
    </Page>
  );
};

export default PatientDashboard;
