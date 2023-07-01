import Page from "../../../../components/layout/page";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ClassCard from "./classCard";
import classes from "./styles.module.scss";
import { getStudentUnits } from "api/timeTable";
import { useQuery } from "react-query";
import { isClassJoinTime } from "utils/time";
import Button from "components/core/button";
import OnlineClass from "pages/dashboard/master/courses/components/onlineClass";
import { Socket, io } from "socket.io-client";
import { useEffect, useState } from "react";

const PatientDashboard = () => {
  const { data } = useQuery(["studentUnits"], () => getStudentUnits(), {
    keepPreviousData: true,
  });
  const [showClass, setShowClass] = useState(false);

  return (
    <Page title="داشبورد" type="main">
      <div className={classes.card__title}> کلاسهای امروز</div>
      <Swiper
        navigation={false}
        freeMode={true}
        spaceBetween={20}
        slidesPerView={"auto"}
        modules={[FreeMode]}
        centeredSlides={false}
        className="mt-3"
      >
        {data?.data.data?.map((item, index) => {
          const shouldShowCard = isClassJoinTime(
            item.timeTable.timeTableBellList.map((t) => t.day.label)
          );

          return (
            shouldShowCard && (
              <SwiperSlide key={index} className={classes.home__slides}>
                <ClassCard
                  title={item.timeTable.course.title}
                  time={item.timeTable.timeTableBellList[0].bell.label}
                  content={
                    <Button
                      size="small"
                      className="w-100"
                      onClick={() => setShowClass(true)}
                    >
                      پیوستن به کلاس
                    </Button>
                  }
                />
              </SwiperSlide>
            )
          );
        })}
      </Swiper>
      {showClass && <OnlineClass student={true} />}
    </Page>
  );
};

export default PatientDashboard;
