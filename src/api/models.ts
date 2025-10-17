import { ScheduledStatusEnum } from "@/enums/Enum";
import { z } from "zod";

/**
 * COMMON
 */

export const emptyResponseSchema = z.unknown();

/**
 * LOGIN
 */

//Login Request
export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter a valid email." })
    .email({ message: "Invalid email format." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

//Login Response
export const loginUserSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
  role: z.string(),
  isActive: z.boolean(),
  lastLoginAt: z.string().datetime(),
  lastLoginIP: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const loginDataSchema = z.object({
  user: loginUserSchema,
  accessToken: z.string(),
});

export const loginResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: loginDataSchema,
});

//LOGIN EXPORTS
export type LoginFormPayload = z.infer<typeof loginFormSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type LoginData = z.infer<typeof loginDataSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;

//Register request
export const registerFormSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "Full name is required." })
    .regex(/^[A-Za-zÇĞİÖŞÜçğıöşü\s'-]+$/, {
      message:
        "Full name can only contain letters, spaces, hyphens, and apostrophes.",
    }),

  email: z
    .string()
    .min(1, { message: "Email address is required." })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, and one number.",
    }),
});

export const registerResponseDataSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
});

export const registerFormResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: registerResponseDataSchema.optional(),
});

export type RegisterFormPayload = z.infer<typeof registerFormSchema>;
export type RegisterResponseData = z.infer<typeof registerResponseDataSchema>;
export type RegisterResponse = z.infer<typeof registerFormResponseSchema>;

/**
 * REFRESH TOKEN
 */

export const refreshTokenResponseSchema = z.object({
  accessToken: z.string(),
});

export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;

/**
 * PROFILE
 */

export const profileDataSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  role: z.string(),
  isActive: z.boolean(),
  lastLoginAt: z.string().datetime(),
  lastLoginIP: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const profileResponseSchema = z.object({
  success: z.boolean(),
  data: profileDataSchema,
});

export type Profile = z.infer<typeof profileResponseSchema>;

/**
 * SUMMARY
 */
export const changeDto = z.object({
  percentage: z.number(),
  trend: z.string(),
});

export const balanceDto = z.object({
  amount: z.number(),
  currency: z.string(),
  change: changeDto,
});

export const dataDto = z.object({
  totalBalance: balanceDto,
  totalExpense: balanceDto,
  totalSavings: balanceDto,
  lastUpdated: z.string().datetime(),
});

export const summaryResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: dataDto,
});

export type SummaryResponse = z.infer<typeof summaryResponseSchema>;

/**
 * WORKING CAPITAL
 */

export const workingCapitalDataItemDto = z.object({
  month: z.string(),
  income: z.number(),
  expense: z.number(),
  net: z.number(),
});

export const workingCapitalSummaryDto = z.object({
  totalIncome: z.number(),
  totalExpense: z.number(),
  netBalance: z.number(),
});

export const workingCapitalDataDto = z.object({
  period: z.string(),
  currency: z.string(),
  data: z.array(workingCapitalDataItemDto),
  summary: workingCapitalSummaryDto,
});

export const workingCapitalResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: workingCapitalDataDto,
});

export type WorkingCapitalItem = z.infer<typeof workingCapitalDataItemDto>;
export type WorkingCapitalSummary = z.infer<typeof workingCapitalSummaryDto>;
export type WorkingCapitalData = z.infer<typeof workingCapitalDataDto>;
export type WorkingCapitalResponse = z.infer<
  typeof workingCapitalResponseSchema
>;

/**
 * TRANSACTIONS
 */

export const transactionItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  business: z.string(),
  image: z.string().url(),
  type: z.string(),
  amount: z.number(),
  currency: z.string(),
  date: z.string().datetime(),
  status: z.enum(["completed", "pending", "failed"]),
});

export const transactionDataSchema = z.object({
  transactions: z.array(transactionItemSchema),
});

export const transactionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: transactionDataSchema,
});

export type Transaction = z.infer<typeof transactionItemSchema>;
export type TransactionData = z.infer<typeof transactionDataSchema>;
export type TransactionResponse = z.infer<typeof transactionResponseSchema>;

/**
 * WALLET
 */

export const cardDto = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["credit", "debit", "prepaid"]).default("credit"),
  cardNumber: z.string(),
  bank: z.string(),
  network: z.string(),
  expiryMonth: z.number().min(1).max(12),
  expiryYear: z.number().gte(2020).lte(2100),
  color: z.string().regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid color code"),
  isDefault: z.boolean(),
});

export const walletResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    cards: z.array(cardDto),
  }),
});

export type CardDto = z.infer<typeof cardDto>;
export type WalletResponseDto = z.infer<typeof walletResponseSchema>;

/**
 * SCHEDULED
 */

export const scheduledTransferItemDto = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  date: z.string().datetime(),
  amount: z.number(),
  currency: z.string(),
  status: ScheduledStatusEnum,
});

export const scheduledSummaryDto = z.object({
  totalScheduledAmount: z.number(),
  count: z.number(),
});

export const scheduledTransfersDataDto = z.object({
  transfers: z.array(scheduledTransferItemDto),
  summary: scheduledSummaryDto,
});

export const scheduledTransfersResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: scheduledTransfersDataDto,
});

export type ScheduledTransfer = z.infer<typeof scheduledTransferItemDto>;
export type ScheduledSummary = z.infer<typeof scheduledSummaryDto>;
export type ScheduledTransfersData = z.infer<typeof scheduledTransfersDataDto>;
export type ScheduledTransfersResponse = z.infer<
  typeof scheduledTransfersResponseSchema
>;
