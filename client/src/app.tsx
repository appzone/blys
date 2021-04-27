import "bootstrap-4-grid/css/grid.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Routers from "./routers";
import store from "./store";
import { checkSession } from "./store/actions/authActions";
import GlobalStyle from "./styles/global";

class App extends React.Component {
  constructor(props: any) {
    super(props);
    store.dispatch(checkSession());
  }

  render() {
    return (
      <Provider store={store}>
        <GlobalStyle />
          <Routers />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
