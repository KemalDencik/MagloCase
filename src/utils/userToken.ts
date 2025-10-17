let cachedToken: string | null = null;

export const getAuthorizationHeader = ():
  | { Authorization: string }
  | undefined => {
  if (!cachedToken) {
    cachedToken = localStorage.getItem("accessToken");
  }

  return cachedToken ? { Authorization: `Bearer ${cachedToken}` } : undefined;
};

export const getAuthorizationToken = (): string | null => {
  if (!cachedToken) {
    cachedToken = localStorage.getItem("accessToken");
  }
  return cachedToken;
};

export const setAuthorizationToken = (token: string | null) => {
  cachedToken = token;

  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    localStorage.removeItem("accessToken");
  }
};

export const removeAuthorizationToken = () => {
  cachedToken = null;
  localStorage.removeItem("accessToken");
};
