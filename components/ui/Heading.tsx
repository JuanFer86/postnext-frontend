import { ReactNode } from "react";

const Heading = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-2xl my-10">{children}</h1>;
};

export default Heading;
