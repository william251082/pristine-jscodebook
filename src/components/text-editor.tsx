import React, {FC, useEffect, useRef, useState} from "react";
import MDEditor from "@uiw/react-md-editor";

const TextEditor: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && 
        event.target && 
        ref.current.contains(event.target as Node)) {
        console.log('element clicked on inside the editor');
        return;
      }
      console.log('element not clicked on inside the editor');
      console.log(event.target);
      setEditing(false);
    };
    document.addEventListener('click', listener, {capture: true});
    return () => {
      document.removeEventListener('click', listener, {capture: true})
    }
  }, []);

  if (editing) {
    return (
      <div ref={ref}>
        <MDEditor />
      </div>
    )
  }

  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={'# Header'} />
    </div>
  );
};

export default TextEditor;