import React, {FC} from "react";
import MDEditor from "@uiw/react-md-editor";

const TextEditor: FC = () => {
  return (
    <div>
      <MDEditor.Markdown source={'# Header'} />
    </div>
  );
};

export default TextEditor;