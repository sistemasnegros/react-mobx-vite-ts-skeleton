// import { Person } from '@/models';
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../../auth/redux/reducers/auth-slice.reducer";
import { UsersDomain } from "../../users/domain/users.domain";
import { loadingReducer } from "./reducers/loading-slice.reducer";
// import { favoritesSlice, peopleSlice } from './states';

interface Auth {
  user: UsersDomain | {};
  token: string;
}

export interface AppStore {
  loading: boolean;
  auth: Auth;
}

export default configureStore<AppStore>({
  reducer: {
    loading: loadingReducer,
    auth: authReducer,
  },
});
