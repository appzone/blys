import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const middlewares: any[] = [
  sagaMiddleware,
];
if (process.env.NODE_ENV !== "production") {
  middlewares.push(logger);
}
function configureStore() {
  const store = createStore(
    reducers,
    (process.env.NODE_ENV === "production")
      ? applyMiddleware(...middlewares)
      : composeEnhancers(applyMiddleware(...middlewares)),
  );
  // epicMiddleware.run(epics);
  sagaMiddleware.run(sagas);
  return store;
}

export default configureStore();

declare global {
  // tslint:disable-next-line: interface-name
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
