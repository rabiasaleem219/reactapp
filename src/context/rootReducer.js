import { combineReducers } from "redux";

import { authReducer } from "./auth/authReducer";
import { coursesReducer } from "./courses/coursesReducer";
import { categoriesReducer } from "./categories/categoriesReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  courses: coursesReducer,
  categories: categoriesReducer,
});

export default rootReducer;
