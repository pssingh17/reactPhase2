import { configureStore } from '@reduxjs/toolkit'
import AllListingsSliceReducer from '../features/AllListingsReducer/AllListingsSlice'
import UserDataSliceReducer from '../features/UserDataReducer/UserDataSlice'
import FavouritesDataSliceReducer from '../features/UserDataReducer/FavouritesReducer'

export const store = configureStore({
  reducer: {
    AllListingsSlice:AllListingsSliceReducer,
    UserDataSlice : UserDataSliceReducer,
    Favourites : FavouritesDataSliceReducer,
    
    
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch