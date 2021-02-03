import ReactDOM from 'react-dom';
import {useState} from "react";
import CodeEditor from "./components/code-editor";
import 'bulmaswatch/nuclear/bulmaswatch.min.css';
import Preview from "./components/preview";
import bundle from "./bundler";

const App = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue="hi"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>
          Submit
        </button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App/>, document.querySelector('#root'));