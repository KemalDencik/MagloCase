import qs from "query-string";

export type ApiError = {
  status: number;
  message: string;
  details?: Record<string, string>;
};

export const getURL = (path: string, params?: Record<string, unknown>) =>
  import.meta.env.VITE_API_URL +
  path +
  (params && Object.keys(params).length > 0 ? `?${qs.stringify(params)}` : "");
