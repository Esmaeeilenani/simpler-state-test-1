import axios from "axios";
import { entity, persistence } from "simpler-state";
import { toastMessage, ToastType } from "./app.entities";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

interface IDefaultState {
  token: null | string;
  user: null | IUser;
}
const defaultState = {
  token: null,
  user: null,
};

export const authEntity = entity<IDefaultState>(defaultState, [
  persistence("Shop_Auth"),
]);

// actions

//on login
export const setAuth = (user: IUser, token: string) =>
  authEntity.set({ user, token });

//on logout
export const clearAuth = () => authEntity.set({ user: null, token: null });

export const doLogin = async (email: string, password: string) => {
  const res = await axios
    .post("http://authentication-url", {
      email,
      password,
    })
    .catch((err) => err);

  //if any Error Accoure
  if (axios.isAxiosError(res)) {
    if (res.message) {
      toastMessage(res.message, ToastType.error, 10_000);
    } else {
      console.log(res.stack);
    }

    return;
  }

  const data = res.data;
  //if the user entered the correct credentials
  setAuth(data.user, data.token);
  if (data.message) {
    toastMessage(data.message, ToastType.success);
  }
};
