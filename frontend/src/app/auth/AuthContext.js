import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import FuseSplashScreen from "@fuse/core/FuseSplashScreen";
import { showMessage } from "app/store/fuse/messageSlice";
import { logoutUser, setUser } from "app/store/userSlice";
import jwtService from "./services/jwtService";
import { useTranslation } from "react-i18next";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  const dispatch = useDispatch();

  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    jwtService.on("onAutoLogin", () => {
      // {t("login.message.signing")}
      dispatch(showMessage({ message: t("login.message.signing") }));

      /**
       * Sign in and retrieve user data with stored token
       */
      jwtService
        .signInWithToken()
        .then((user) => {
          success(user, t("login.message.signed"));
        })
        .catch((error) => {
          console.log("🚀 ~ jwtService.on ~ error:", error)
          pass(error.message);
        });
    });

    jwtService.on("onLogin", (user) => {
      success(user, t("login.message.signed"));
    });

    jwtService.on("onLogout", () => {
      pass(t("login.message.out"));

      dispatch(logoutUser());
    });

    jwtService.on("offService", () => {
      //pass(t("login.message.out"));
      pass("Service error connect!");
    });

    jwtService.on("onAutoLogout", (message) => {
      console.log("🚀 ~ jwtService.on ~ message:", message)
      pass(message);

      dispatch(logoutUser());
    });

    jwtService.on("onNoAccessToken", () => {
      pass();
    });

    jwtService.init();

    function success(user, message) {
      if (message) {
        dispatch(showMessage({ message }));
      }

      Promise.all([
        dispatch(setUser(user)),
        // You can receive data in here before app initialization
      ]).then((values) => {
        setWaitAuthCheck(false);
        setIsAuthenticated(true);
      });
    }

    function pass(message) {
      console.log("🚀 ~ pass ~ message:", message)
      if (message) {
        dispatch(showMessage({ message }));
      }

      setWaitAuthCheck(false);
      setIsAuthenticated(false);
    }
  }, [dispatch]);

  return waitAuthCheck ? (
    <FuseSplashScreen />
  ) : (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
