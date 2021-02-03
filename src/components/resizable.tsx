import {FC, useEffect} from "react";
import {ResizableBox, ResizableBoxProps} from "react-resizable";
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable : FC<ResizableProps> = ({direction, children}) => {
  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    const listener = () => {
     console.log(window.innerWidth, window.innerHeight)
    };
    window.addEventListener('resize', listener);

    // clean up
    return () => {
      window.removeEventListener('resize', listener)
    };
  }, []);
  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ['e']
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s']
    }
  }
  return (
    <ResizableBox {...resizableProps}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;