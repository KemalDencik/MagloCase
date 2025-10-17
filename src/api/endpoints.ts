import { getAuthorizationHeader } from "@/utils/userToken";
import { get, post } from "./client";
import {
  emptyResponseSchema,
  LoginFormPayload,
  loginResponseSchema,
  profileResponseSchema,
  refreshTokenResponseSchema,
  RegisterFormPayload,
  registerFormResponseSchema,
  scheduledTransfersResponseSchema,
  summaryResponseSchema,
  transactionResponseSchema,
  walletResponseSchema,
  workingCapitalResponseSchema,
} from "./models";
import { getURL } from "./utils";

/**
 * LOGIN
 */
export const login = (body: LoginFormPayload) =>
  post(loginResponseSchema, getURL(`/users/login`), {
    headers: getAuthorizationHeader(),
    body,
  });

/**
 * REGISTER
 */
export const register = (body: RegisterFormPayload) =>
  post(registerFormResponseSchema, getURL(`/users/register`), {
    headers: getAuthorizationHeader(),
    body,
  });

/**
 * REFRESH TOKEN
 */
export const refreshToken = () =>
  post(refreshTokenResponseSchema, getURL(`/users/refresh-token`), {
    headers: getAuthorizationHeader(),
  });

/**
 * LOGOUT
 */
export const logout = () =>
  post(emptyResponseSchema, getURL(`/users/logout`), {
    headers: getAuthorizationHeader(),
  });

/**
 * PROFILE
 */
export const fetchUserProfile = () =>
  get(profileResponseSchema, getURL(`/users/profile`), {
    headers: getAuthorizationHeader(),
  });

/**
 * Dashboard
 */

// SUMMARY
export const fetchSummary = () =>
  get(summaryResponseSchema, getURL(`/financial/summary`), {
    headers: getAuthorizationHeader(),
  });

// WORKING CAPITAL
export const fetchWorkingCapital = () =>
  get(workingCapitalResponseSchema, getURL(`/financial/working-capital`), {
    headers: getAuthorizationHeader(),
  });

// TRANSACTIONS RECENT
export const fetchTransactionRecent = (limit?: number) =>
  get(
    transactionResponseSchema,
    getURL(`/financial/transactions/recent${limit ? `?limit=${limit}` : ""}`),
    {
      headers: getAuthorizationHeader(),
    }
  );

// WALLET
export const fetchWallet = () =>
  get(walletResponseSchema, getURL(`/financial/wallet`), {
    headers: getAuthorizationHeader(),
  });

// SCHEDULED
export const fetchScheduledTransfers = () =>
  get(
    scheduledTransfersResponseSchema,
    getURL(`/financial/transfers/scheduled`),
    {
      headers: getAuthorizationHeader(),
    }
  );
