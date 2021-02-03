import {FC} from "react";
import {ResizableBox, ResizableBoxProps} from "react-resizable";
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable : FC<ResizableProps> = ({direction, children}) => {
  let resizableProps: ResizableBoxProps;
  if (direction === 'horizontal') {
    resizableProps = {
      height: 0,
      width: 0
    };
  } else {
    resizableProps = {
      height: 0,
      width: 0
    }
  }
  return (
    <ResizableBox
      minConstraints={[Infinity, 24]}
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
      height={300}
      width={Infinity}
      resizeHandles={['s']}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;