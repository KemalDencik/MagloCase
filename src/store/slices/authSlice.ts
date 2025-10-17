/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginResponse } from "@/api/models";
import {
  getAuthorizationHeader,
  setAuthorizationToken,
  removeAuthorizationToken,
} from "@/utils/userToken";
import { login, logout, refreshToken } from "@/api/endpoints";

interface AuthState {
  user: LoginResponse["data"]["user"] | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

/**
 * Başlangıç state
 */
const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem("accessToken"),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data: LoginResponse = await login(credentials);

      const accessToken = data?.data?.accessToken;
      const user = data?.data?.user;

      if (accessToken) {
        setAuthorizationToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
      }

      if (user) {
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userFullName", user.fullName);
      }

      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    await logout();
  } catch (e) {
    console.warn("Backend logout failed:", e);
  }

  removeAuthorizationToken();
  localStorage.clear();
  window.location.href = "/auth/login";
});

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      const current = getAuthorizationHeader();
      if (!current) throw new Error("No token found");

      const data = await refreshToken();

      if (data?.accessToken) {
        setAuthorizationToken(data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);
        return data.accessToken;
      }

      throw new Error("Invalid refresh response");
    } catch (err) {
      return rejectWithValue("Token refresh failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem("accessToken");
      const fullName = localStorage.getItem("userFullName");
      const email = localStorage.getItem("userEmail");

      if (token && fullName && email) {
        state.user = {
          id: "local",
          fullName,
          email,
          role: "USER",
          isActive: true,
          lastLoginAt: "",
          lastLoginIP: "",
          createdAt: "",
          updatedAt: "",
        };
        state.accessToken = token;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse["data"]>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload || null;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.accessToken = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.loading = false;
      });
  },
});

export const { loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
