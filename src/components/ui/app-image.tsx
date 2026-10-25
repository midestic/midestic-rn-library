import { Image, type ImageProps } from "react-native";

export type AppImageProps = Omit<ImageProps, "source"> & {
  source: ImageProps["source"] | number;
  className?: string;
  contentFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
};

export const AppImage = ({
  source,
  className = "",
  contentFit = "contain",
  style,
  ...props
}: AppImageProps) => {
  const resizeMode = contentFit === "scale-down" ? "contain" : (contentFit as ImageProps["resizeMode"]);

  return <Image source={source} resizeMode={resizeMode} className={className} style={style} {...props} />;
};
