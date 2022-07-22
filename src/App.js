// import getData from './components/utils'

import "./App.css";
import { StateProvider } from "./Contexts/stateProvider";
import Router from "./routes";

function App() {
  return (
    <StateProvider>
      <Router />
    </StateProvider>
  );
}

export default App;
