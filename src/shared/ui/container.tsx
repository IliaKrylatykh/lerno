import { FC, PropsWithChildren } from "react";
import { cn } from "./utils";

interface Props {
  className?: string;
}

export const Container: FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("mx-auto max-w-[1440px] px-2", className)}>
      {children}
    </div>
  );
};
