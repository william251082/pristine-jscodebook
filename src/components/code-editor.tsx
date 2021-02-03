import './code-editor.css';
import './syntax.css';
import MonacoEditor, {EditorDidMount} from "@monaco-editor/react";
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import {useRef} from "react";
import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({onChange, initialValue}) => {
  const editorRef = useRef<any>();
  //monacoEditor is a reference to the editor itself
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      //@ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      // to make sure not to console log every js error
      // substitution for default internal logging of monaco-jsx-highlighter
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };
  const onFormatClick = () => {
    console.log(editorRef.current);
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();
    // format that value
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    }).replace(/\n$/, '');
    // set the formatted value back to the editor
    editorRef.current.setValue(formatted)
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme="dark"
        height="500px"
        language="javascript"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />
    </div>
  );
};

export default CodeEditor;