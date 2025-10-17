import axios, { isAxiosError } from "axios";
import { z } from "zod";

import { removeAuthorizationToken } from "@/utils/userToken";

type FetchUrl = string;

type FetchInit = Omit<Parameters<typeof axios.request>[0], "data"> & {
  body?: unknown;
};

const apiClient = async <R>(schema: z.Schema<R>, url: FetchUrl, config: FetchInit = {}) => {
  const { body, headers, ...rest } = config;

  const isFormData = body instanceof FormData;

  const axiosConfig = {
    ...rest,
    url,
    headers: {
      Accept: "*/*",
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      ...headers,
    },
    data: isFormData ? body : body ?? undefined,
  };

  try {
    const response = await axios.request(axiosConfig);
    const parsed = schema.parse(response.data);
    return parsed;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        removeAuthorizationToken();
        window.location.reload();
      }
      if (import.meta.env.DEV) {
        console.error("API client error:", error.response.data);
      }
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const get = <R>(schema: z.Schema<R>, url: FetchUrl, init?: FetchInit) =>
  apiClient<R>(schema, url, { ...init, method: "GET" });

export const post = <R>(schema: z.Schema<R>, url: FetchUrl, init?: FetchInit) =>
  apiClient<R>(schema, url, { ...init, method: "POST" });

export const put = <R>(schema: z.Schema<R>, url: FetchUrl, init?: FetchInit) =>
  apiClient<R>(schema, url, { ...init, method: "PUT" });

export const patch = <R>(schema: z.Schema<R>, url: FetchUrl, init?: FetchInit) =>
  apiClient<R>(schema, url, { ...init, method: "PATCH" });

export const del = <R>(schema: z.Schema<R>, url: FetchUrl, init?: FetchInit) =>
  apiClient<R>(schema, url, { ...init, method: "DELETE" });