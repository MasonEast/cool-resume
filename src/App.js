import { init, skeleton } from "@alilc/lowcode-engine";

import logo from "./logo.svg";
import "./App.css";

function App() {
  skeleton.add({
    area: "topArea",
    type: "Widget",
    name: "logo",
    // content: YourFantaticLogo,
    contentProps: {
      logo: "https://img.alicdn.com/tfs/TB1_SocGkT2gK0jSZFkXXcIQFXa-66-66.png",
      href: "/",
    },
    props: {
      align: "left",
      width: 100,
    },
  });

  init(document.getElementById("lce"));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
