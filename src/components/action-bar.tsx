import "./action-bar.css"
import {FC} from "react";
import {useActions} from "../hooks/use-actions";

interface ActionBarProps {
  id: string;
}

const ActionBar: FC<ActionBarProps> = ({id}) => {
  const {moveCell, deleteCell} = useActions();
  return (
    <div className="action-bar">
      <button className="is-primary is-small" onClick={() => moveCell(id, 'up')}>
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button className="is-primary is-small" onClick={() => moveCell(id, 'down')}>
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button className="is-primary is-small" onClick={() => deleteCell(id)}>
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;