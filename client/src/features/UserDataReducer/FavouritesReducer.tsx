import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface FavouritesDataState {
	value: []
}

const initialState: FavouritesDataState = {
	value: [],
}

export const FavouritesDataSlice = createSlice({
	name: 'FavouritesData',
	initialState,
	reducers: {
		favouriesData: (state, action: PayloadAction<[]>) => {
			state.value = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { favouriesData } = FavouritesDataSlice.actions

export default FavouritesDataSlice.reducer