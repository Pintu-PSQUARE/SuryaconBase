import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '../reducers/UserSlice'


export const store = configureStore({
  reducer: {
    userStore :UserSlice, 
   
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch