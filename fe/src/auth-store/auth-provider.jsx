import { useEffect, useReducer, useCallback, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
// utils
import myAxios from "@/utils/myAxios";
//
import { AuthContext } from "./auth-context";
import { bool } from "yup";

// ----------------------------------------------------------------------

const initialState = {
  user: null,
};

const reducer = (state, action) => {
  if (action.type === "INITIAL") {
    return {
      user: action.payload.user,
    };
  }
  if (action.type === "LOGIN") {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === "SWITCH") {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const payload = jwtDecode(accessToken);
        const response = await myAxios.put(`/token?id=${payload.id}`);

        const user = jwtDecode(response.data.access_token);
        console.log(100,user)
        dispatch({
          type: "INITIAL",
          payload: {
            user: user,
          },
        });
      } else {
        dispatch({
          type: "INITIAL",
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "INITIAL",
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const data = {
      email,
      password,
    };

    const response = await myAxios.post("/token", data);
    localStorage.setItem("accessToken", response.data.access_token);
    const user = jwtDecode(response.data.access_token);
    dispatch({
      type: "LOGIN",
      payload: {
        user: user,
      },
    });
  }, []);

  // LOGOUT
  const switch_role = useCallback(async (user_id, role_id) => {
    const response = await myAxios.put(
      `/${user_id}/curr_role_id?role_id=${role_id}`
    );
    const user = jwtDecode(response.data.access_token);
    
    dispatch({
      type: "SWITCH",
      payload: {
        user: user,
      },
    });
    window.location.href = "/cases";
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    localStorage.removeItem("accessToken");
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = "/login";
  }, []);

  // ----------------------------------------------------------------------

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      //
      login,
      logout,
      switch_role,
    }),
    [login, logout, state.user]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
