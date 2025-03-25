import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AsyncThunkConfig} from '@reduxjs/toolkit/dist/createAsyncThunk';
import {apiUrl} from '../config/Env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cookies from '@react-native-cookies/cookies';

export interface AuthState {
  isLogin: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  profile?: string;
  role?: string;
}

const initialState: AuthState = {
  isLogin: false,
  user: null,
  isLoading: false,
  error: null,
};

// Session cookie name used by Express
const SESSION_COOKIE_NAME = 'connect.sid';

// Helper functions for session management
const saveCookie = async (value: string) => {
  try {
    // Parse the domain from apiUrl
    const url = new URL(apiUrl);
    const domain = url.hostname;

    await Cookies.set(apiUrl, {
      name: SESSION_COOKIE_NAME,
      value,
      path: '/',
      // Don't set these as true if your server isn't configured for them
      secure: false,
      httpOnly: false,
    });
    console.log('Cookie saved successfully');
  } catch (error) {
    console.error('Error saving cookie:', error);
  }
};

const getCookie = async () => {
  try {
    const cookies = await Cookies.get(apiUrl);
    console.log('Cookies:', cookies);

    return cookies[SESSION_COOKIE_NAME]?.value;
  } catch (error) {
    console.error('Error getting cookie:', error);
    return null;
  }
};

export const clearCookies = async () => {
  try {
    await Cookies.clearAll();
    console.log('Cookies cleared successfully');
  } catch (error) {
    console.error('Error clearing cookies:', error);
  }
};

// Check session validity
export const checkSession = createAsyncThunk<void, void, AsyncThunkConfig>(
  'auth/checkSession',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch(`${apiUrl}/check-authgetdata`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        return rejectWithValue('Session expired or invalid');
      }

      const data = await response.json();
      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const loginById = createAsyncThunk<
  void,
  {employeeId: string; password: string},
  AsyncThunkConfig
>('auth/loginById', async (requestData, {rejectWithValue}) => {
  try {
    const response = await fetch(`${apiUrl}/hrmaster/employee/loginEmployee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
      credentials: 'include',
    });

    if (!response.ok) {
      return rejectWithValue(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      return rejectWithValue(data.message);
    }

    // Save session ID from cookie to AsyncStorage as backup
    const sessionId = await getCookie();
    console.log('Session ID after login:', sessionId);

    if (sessionId) {
      // Save the Express session ID for later recovery
      await AsyncStorage.setItem(SESSION_COOKIE_NAME, sessionId);
    }

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const loginWithNumber = createAsyncThunk<
  void,
  {id: string},
  AsyncThunkConfig
>('auth/loginWithNumber', async (body, {rejectWithValue}) => {
  try {
    const response = await fetch(`${apiUrl}/app/loginWithOtp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    if (!response.ok) {
      return rejectWithValue(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      return rejectWithValue(data.message);
    }

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const loginOtpVerify = createAsyncThunk<
  void,
  {credential: string; otp: string},
  AsyncThunkConfig
>('auth/loginOtpVerify', async (body, {rejectWithValue}) => {
  try {
    const response = await fetch(`${apiUrl}/app/loginOtpVerify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    if (!response.ok) {
      return rejectWithValue(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      return rejectWithValue(data.message);
    }

    // Save session ID from cookie to AsyncStorage as backup
    const sessionId = await getCookie();
    if (sessionId) {
      await AsyncStorage.setItem(SESSION_COOKIE_NAME, sessionId);
    }

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const forgotPasswordOtp = createAsyncThunk<
  void,
  {credential: string},
  AsyncThunkConfig
>('auth/forgotPasswordOtp', async (body, {rejectWithValue}) => {
  try {
    const response = await fetch(`${apiUrl}/app/forgotPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return rejectWithValue(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      return rejectWithValue(data.message);
    }

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const forgotOtpVerification = createAsyncThunk<
  void,
  {credential: string; otp: string},
  AsyncThunkConfig
>('auth/forgotOtpVerification', async (body, {rejectWithValue}) => {
  try {
    const response = await fetch(`${apiUrl}/app/forgotPasswordVerify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return rejectWithValue(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      return rejectWithValue(data.message);
    }

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const resetPassword = createAsyncThunk<
  void,
  {token: string; newPassword: string},
  AsyncThunkConfig
>('auth/resetPassword', async (body, {rejectWithValue}) => {
  try {
    const response = await fetch(`${apiUrl}/app/resetPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return rejectWithValue(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      return rejectWithValue(data.message);
    }

    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const logoutUser = createAsyncThunk<void, void, AsyncThunkConfig>(
  'auth/logoutUser',
  async (_, {rejectWithValue}) => {
    try {
      const response = await fetch(`${apiUrl}/app/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      // Clear cookies regardless of response
      await clearCookies();
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem(SESSION_COOKIE_NAME);

      if (!response.ok) {
        return rejectWithValue(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Still clear local storage even if the API call fails
      await clearCookies();
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem(SESSION_COOKIE_NAME);
      return rejectWithValue((error as Error).message);
    }
  },
);

export const restoreSession = createAsyncThunk<void, void, AsyncThunkConfig>(
  'auth/restoreSession',
  async (_, {dispatch, rejectWithValue}) => {
    try {
      // Try to get the session cookie
      const sessionId = await getCookie();
      console.log('Retrieved session ID during restore:', sessionId);

      // If no cookie found, try to restore from AsyncStorage
      if (!sessionId) {
        console.log('No cookie found, checking AsyncStorage');
        const storedSessionId = await AsyncStorage.getItem(SESSION_COOKIE_NAME);

        if (storedSessionId) {
          console.log('Found session in AsyncStorage, restoring cookie');
          // Recreate the cookie from stored value
          await saveCookie(storedSessionId);
        } else {
          console.log('No session found in AsyncStorage');
          return rejectWithValue('No session found');
        }
      }

      // Now check if the session is valid
      try {
        console.log('Checking session validity');
        return await dispatch(checkSession()).unwrap();
      } catch (error) {
        console.log('Session invalid, removing stored data');
        // If session check fails, clear everything
        await clearCookies();
        await AsyncStorage.removeItem(SESSION_COOKIE_NAME);
        await AsyncStorage.removeItem('user');
        throw error;
      }
    } catch (error) {
      console.log('Error in restoreSession:', error);
      return rejectWithValue((error as Error).message);
    }
  },
);

export const authSlice = createSlice({
  name: 'userStore',
  initialState,
  reducers: {
    setUser: (state, {payload}) => {
      state.user = payload;
      state.isLogin = !!payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Check session
      .addCase(checkSession.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkSession.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        if (payload) {
          const typedPayload = payload as unknown as {
            success: boolean;
            management: User;
          };
          if (typedPayload.success) {
            state.isLogin = true;
            state.user = {...typedPayload.management, role: 'user'};

            // Store user data in AsyncStorage as backup
            const userData = JSON.stringify(typedPayload.management);
            AsyncStorage.setItem('user', userData);
          }
        }
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isLogin = false;
        state.user = null;
      })

      // Login by ID
      .addCase(loginById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginById.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        const typedPayload = payload as unknown as {
          success: boolean;
          management: User;
        };
        if (typedPayload?.success) {
          state.isLogin = true;
          state.user = {...typedPayload.management, role: 'user'};

          // Store user data in AsyncStorage as backup
          const userData = JSON.stringify(typedPayload.management);
          AsyncStorage.setItem('user', userData);
        }
      })
      .addCase(loginById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Login with OTP
      .addCase(loginWithNumber.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithNumber.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(loginWithNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // OTP Verification
      .addCase(loginOtpVerify.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginOtpVerify.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        const typedPayload = payload as unknown as {
          success: boolean;
          management: User;
        };
        if (typedPayload?.success) {
          state.isLogin = true;
          state.user = {...typedPayload.management, role: 'user'};

          // Store user data in AsyncStorage as backup
          const userData = JSON.stringify(typedPayload.management);
          AsyncStorage.setItem('user', userData);
        }
      })
      .addCase(loginOtpVerify.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Logout
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.isLogin = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, state => {
        state.isLoading = false;
        state.isLogin = false;
        state.user = null;
      })

      // Restore session
      .addCase(restoreSession.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(restoreSession.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(restoreSession.rejected, state => {
        state.isLoading = false;
        state.isLogin = false;
        state.user = null;
      });
  },
});

export const {setUser, clearError} = authSlice.actions;
export default authSlice.reducer;
