import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storeSession from "redux-persist/lib/storage/session";
import BrowserRecodeReducer from "./reducers/browserRecodeReducer";
import ProdListParamsReducer from "./reducers/prodListParamsReducer";
import ChangeCategoryColorReducer from "./reducers/changeCategoryColorReducer";

type RootStore = ReturnType<typeof rootReducer>;

const storageConfig = {
  key: "root",
  storage: storeSession,
  // blacklist: [], // reducer 裡不持久化的資料
};

const rootReducer = combineReducers({
  browserRecode: BrowserRecodeReducer,
  prodListParams: ProdListParamsReducer,
  changeCategoryColor: ChangeCategoryColorReducer,
});

const myPersistReducer = persistReducer<RootStore, any>(
  storageConfig,
  rootReducer
);

const store = createStore(myPersistReducer);
export const persistor = persistStore(store);
export default store;
