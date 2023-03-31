import Comments from "./components/Comments";
import "./App.css";
import { useCommentContext } from "./store";

function App() {
  const {
    state: { comments },
  } = useCommentContext();
  return (
    <div className="App">
      <Comments comments={comments} />
    </div>
  );
}

export default App;
