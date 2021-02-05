import {FC, useEffect, useState} from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import {Cell} from "../state";
import {useActions} from "../hooks/use-actions";
import {useTypedSelector} from "../hooks/use-typed-selector";

interface CodeCellProps {
  cell: Cell
}

const CodeCell: FC<CodeCellProps> = ({cell}) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  console.log(bundle);
  useEffect(() => {
    const timer = setTimeout(async() => {
      createBundle(cell.id, cell.content)
    }, 750);
    return () => {
      clearTimeout(timer)
    };
  }, [cell.id, cell.content]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {/*<Preview code={code} err={err} />*/}
      </div>
    </Resizable>

  );
};

export default CodeCell;