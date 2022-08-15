import PopupError from "../components/common/Popup/PopupError";
import PopupOk from "../components/common/Popup/PopupOk";
import { endPoints } from "../const/endPoints";
import { types } from "../context/types/types";
import {
  fetchWithoutToken,
  fetchWithRefreshToken,
  fetchWithToken,
} from "../helpers/fetch";

export const startLogin = (userOrEmail, password) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken(
      endPoints.signin,
      { userOrEmail, password },
      "POST"
    );
    const body = await resp.json();
    if (resp.status === 200) {
      localStorage.setItem("at", body.access_token);
      localStorage.setItem("rt", body.refresh_token);
      const user = await getUser();
      const profileImageUrl = await getProfileImageUrl(user.image);
      user["profileImageUrl"] = profileImageUrl;
      setTimeout(() => {
        dispatch(
          login({
            user,
          })
        );
      }, 1500);
      // Popup de inicio exitoso. Se ejecuta 1.5s antes del dispatch para que el usuario vea el popup.
      PopupOk("22rem", "success", "Inicio de sesion exitoso");
    } else {
      console.log(body.message);
      PopupError(body.message);
    }
  };
};

export const startRegister = (value) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken(endPoints.signup, value, "PUT");
    const body = await resp.json();
    console.log(`este es el status ${resp.status}`);
    if (resp.status !== 201) {
      return PopupError(body.message);
    }
    localStorage.setItem("at", body.access_token);
    localStorage.setItem("rt", body.refresh_token);
    const user = await getUser();
    PopupOk("28rem", "success", "Se registró con exito");
    setTimeout(() => {
      dispatch(
        login({
          user,
        })
      );
      window.location.href = "/profile/courses";
    }, 1500);
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    if (!localStorage.getItem("at") && !localStorage.getItem("rt")) {
      return dispatch(checkingFinish());
    }
    const user = await getUser();
    if (user.statusCode === 401) {
      const refresh = await fetchWithRefreshToken(endPoints.refresh_token);
      const body = await refresh.json();
      if (!refresh.status === 200) {
        return dispatch(checkingFinish());
      }
      localStorage.setItem("at", body.access_token);
      localStorage.setItem("rt", body.refresh_token);
      const user = await getUser();
      if (user.statusCode === 401) {
        return dispatch(checkingFinish());
      }
      if (!user.statusCode) {
        const profileImageUrl = await getProfileImageUrl(user.image);
        user["profileImageUrl"] = profileImageUrl;
        return dispatch(login({ user }));
      }
    }
    const profileImageUrl = await getProfileImageUrl(user.image);
    user["profileImageUrl"] = profileImageUrl;
    return dispatch(login({ user }));
  };
};

const checkingFinish = () => ({
  type: types.authCheckingFinish,
  payload: {},
});

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return async (dispatch) => {
    await fetchWithToken(endPoints.logout, {}, "PUT");
    localStorage.clear();
    PopupOk("28rem", "info", "Sesion cerrada con exito");
    setTimeout(() => dispatch(logout()), 1500);
  };
};

const logout = () => ({ type: types.authLogout, payload: {} });

const getUser = async () => {
  const resp = await fetchWithToken(endPoints.get_user);
  const body = await resp.json();
  return body;
};

const getProfileImageUrl = async (image) => {
  const res = await fetchWithToken(`${endPoints.get_profile_image}/${image}`);
  const url = res.url;
  return url;
};
