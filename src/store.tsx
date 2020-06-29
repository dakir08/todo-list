import { createStore, applyMiddleware } from "redux";
import createSagaMW from "redux-saga";

import reducer from "./reducers";
import rootSaga from "./middlewares/sagas";

const sagaMiddleWare = createSagaMW();

export default createStore(reducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(rootSaga);
