"use client";

import Cookies from "js-cookie";

export const setAuthToken = (token) => {
  Cookies.set("access_token", token, {
    expires: 7,
    secure: true,
    sameSite: "Lax",
    domain:
      process.env.NODE_ENV === "production"
        ? process.env.DOMAIN_NAME
        : undefined,
  });
};

export const clearAuthToken = () => {
  Cookies.remove("access_token", { secure: true, sameSite: "Strict" });
};

export const getAuthToken = () => {
  return Cookies.get("access_token");
};
