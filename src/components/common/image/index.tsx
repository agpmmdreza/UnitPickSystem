import Loader from "../loader";
import {ImgHTMLAttributes} from "react";

export interface IImageProps extends ImgHTMLAttributes<any> {
  className?: string;
  src: string;
  alt?: string;
  isLoading?: boolean;
}

const Image = ({ alt, src, className, isLoading, ...rest }: IImageProps) => {
  return (
    <Loader isLoading={isLoading || false}>
      <img
        src={src}
        alt={alt}
        className={className}
        loading={"eager"}
        {...rest}
      />
    </Loader>
  );
};

export default Image;
