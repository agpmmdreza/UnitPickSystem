import classes from "./styles.module.scss";
import clsx from "clsx";
import {useEffect, useState} from "react";
import CountryFlag from "components/common/countryFlag";
import BeatLoader from "react-spinners/BeatLoader";
import {validateUUID} from "utils/uuid";
import {useQuery} from "react-query";

// import { showFile } from "api/files";

export interface IAvatarDefaultProps {
  src?: string | null; // accept both uuid and url
  name: string; // ! please pass person name as image alt
  className?: string;
  contentClassName?: string;
  badge?: React.ReactNode;
  size?: "small" | "normal" | "big" | "large" | "x-large" | "veryLarge";
  flag?: string;
  isFetching?: boolean;
  whiteBorder?: boolean;
}

function getSrcType(src: string | undefined | null) {
  if (src) {
    try {
      new URL(src);
      return "url";
    } catch (error) {
      const result = validateUUID(src);
      if (result) return "uuid";
      else return "none";
    }
  }
  return "none";
}

// check url to confirm it is an image url
function checkImageIsValid(
  url: string,
  callback: React.Dispatch<React.SetStateAction<boolean>>
) {
  var img = new Image();
  img.onload = function () {
    callback(true);
  };
  img.onerror = function () {
    callback(false);
  };
  img.src = url;
}

// component to display avatar image with little info
// TODO: implement badge
function Avatar({
  src,
  name,
  className,
  contentClassName,
  badge,
  size,
  flag,
  isFetching,
  whiteBorder,
}: IAvatarDefaultProps) {
  /*const { data: newSrc, isLoading: urlIsLoading } = useQuery(
    [showFile.name],
    () => showFile(src || ""),
    {
      enabled: !!src && src !== "" && !src.includes("http"),
    }
  );

  console.log(!!src && src !== "" && !src.includes("http"));



  const imgSrc = src?.includes("http") ? src : newSrc;*/
  const [isAddresValid, setIsAddressValid] = useState(false);
  const srcType = getSrcType(src);
  const showFile = () => {};
  const {
    data: imgSrc,
    isLoading: urlIsLoading,
    isFetching: urlIsFetching,
  } = useQuery(
    ["getFile", src],
    () => !!src && srcType === "uuid" && showFile(),
    {
      enabled: !!src && srcType === "uuid",
      onSuccess: (data) => {
        // checkImageIsValid(data, setIsAddressValid);
      },
      onError: () => setIsAddressValid(false),
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  //image validation
  useEffect(() => {
    if (srcType === "uuid" && !urlIsLoading && !urlIsFetching) {
      // checkImageIsValid(imgSrc, setIsAddressValid);
    } else if (!!src) {
      checkImageIsValid(src, setIsAddressValid);
    }
  }, [src, imgSrc, urlIsLoading, urlIsFetching, srcType]);

  // render component
  return (
    <div className={classes.avatarContainer}>
      <div
        data-isvalid={isAddresValid}
        data-loading={isFetching || urlIsLoading || urlIsFetching}
        data-size={size}
        data-white-border={!!whiteBorder}
        className={clsx([classes.avatar, className])}
      >
        {/* <img src={src} alt={name} className={classes.avatarContent} /> */}
        {isFetching || urlIsLoading || urlIsFetching ? (
          <div className={classes.loaderContainer}>
            <BeatLoader color="#fff" size={10} margin={2} />{" "}
          </div>
        ) : !isAddresValid ? (
          <div className={clsx([classes.avatarContent, contentClassName])}>
            {name?.length > 0
              ? name
                  .split(" ")
                  .map((x) => x[0].toUpperCase())
                  .join("")
              : ""}
          </div>
        ) : (
          <img
            // src={srcType === "uuid" ? imgSrc : src}
            alt={name}
            className={classes.avatarContent}
          />
        )}
      </div>
      <div className={classes.flag}>
        {flag && <CountryFlag flag={flag} name="" />}
      </div>
    </div>
  );
}

Avatar.defaultProps = {
  size: "normal",
};

export default Avatar;
