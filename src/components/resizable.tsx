import {FC} from "react";

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable : FC<ResizableProps> = ({direction, children}) => {
  return <div>{children}</div>
};

export default Resizable;