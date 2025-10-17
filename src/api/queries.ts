import { useMutation, useQuery } from "@tanstack/react-query";
import {
  LoginFormPayload,
  Profile,
  RefreshTokenResponse,
  RegisterFormPayload,
  TransactionResponse,
} from "./models";
import {
  fetchScheduledTransfers,
  fetchSummary,
  fetchTransactionRecent,
  fetchUserProfile,
  fetchWallet,
  fetchWorkingCapital,
  login,
  logout,
  refreshToken,
  register,
} from "./endpoints";

/**
 * LOGIN
 */
export const useLoginUser = () => {
  return useMutation({
    mutationFn: (payload: LoginFormPayload) => login(payload),
  });
};

/**
 * REGISTER
 */
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (payload: RegisterFormPayload) => register(payload),
  });
};

/**
 * REFRESH TOKEN
 */
export const useRefreshToken = () => {
  return useMutation<RefreshTokenResponse>({
    mutationFn: () => refreshToken(),
  });
};

/**
 * LOGOUT
 */
export const useLogout = () => {
  return useMutation({
    mutationFn: () => logout(),
  });
};

/**
 * PROFILE
 */
const userProfileQueryKeys = {
  fetch: ["user-profile"] as const,
};

export const useFetchUserProfile = () => {
  return useQuery<Profile>({
    queryKey: userProfileQueryKeys.fetch,
    queryFn: () => fetchUserProfile(),
  });
};

/**
 * DASHBOARD
 */

//Summary
const summaryQueryKeys = {
  fetch: ["summary"] as const,
};

export const useFetchSummary = () =>
  useQuery({
    queryKey: summaryQueryKeys.fetch,
    queryFn: () => fetchSummary(),
  });

//Working Capital
const workingCapitalQueryKeys = {
  fetch: ["working-capital"] as const,
};

export const useFetchWorkingCapital = () =>
  useQuery({
    queryKey: workingCapitalQueryKeys.fetch,
    queryFn: () => fetchWorkingCapital(),
  });

//Transactions
const transactionsQueryKeys = {
  fetch: ["transactions"] as const,
};

export const useFetchTransactions = (limit?: number) =>
  useQuery<TransactionResponse>({
    queryKey: [transactionsQueryKeys.fetch, limit],
    queryFn: () => fetchTransactionRecent(limit),
  });

//Wallet
const walletQueryKeys = {
  fetch: ["wallet"] as const,
};

export const useFetchWallet = () =>
  useQuery({
    queryKey: walletQueryKeys.fetch,
    queryFn: () => fetchWallet(),
  });

//Scheduled Transfers
const scheduledTransfersQueryKeys = {
  fetch: ["scheduled-transfers"] as const,
};

export const useFetchScheduledTransfers = () =>
  useQuery({
    queryKey: scheduledTransfersQueryKeys.fetch,
    queryFn: () => fetchScheduledTransfers(),
  });
