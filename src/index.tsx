import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { App } from "./App";
import { ApplicationStore, CatStore } from "./stores";
import "promise/polyfill";
import "whatwg-fetch";

const applicationStore = new ApplicationStore();
const catStore = new CatStore();

const renderApp = (root: Element, App: React.ComponentClass) => {
  ReactDOM.render(
    <Provider store={applicationStore} catStore={catStore}>
      <App />
    </Provider>,
    root
  );
};

const root = document.getElementById("root");
renderApp(root, App);

if (module.hot) {
  module.hot.accept("./App", function() {
    const NewApp = require("./App").App;
    renderApp(root, NewApp);
  });
}
