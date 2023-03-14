import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LandingPage } from './features/LandingPage';
import { Navbar } from './features/common/Navbar'
import { Routes, Route } from "react-router-dom";
import { Login } from './features/Login';
import { SignUp } from './features/SignUp';
import { MyFavouritesList } from './features/MyFavouritesList';
import { Trending } from './features/Trending';
import { ViewDetails } from './features/ViewDetails';
import { TopPicks } from './features/TopPicks';
import { TopRated } from './features/TopRated';
import { AdvanceFilters } from './features/AdvanceFilters';


function App() {
	return (
		<>
			<Navbar />
			<div className="App">
				<div className='container'>
					<div className='row '>
						<Routes>
							<Route path='/' element={<LandingPage />} />
							<Route path='/login' element={<Login />} />
							<Route path='/signUp' element={<SignUp />} />
							<Route path='/myFavourites' element={<MyFavouritesList />} />
							<Route path='/trending' element={<Trending />} />
							<Route path='/toppicks' element={<TopPicks />} />
							<Route path='/toprated' element={<TopRated />} />
							<Route path='/advanceFilters' element={<AdvanceFilters />} />
						</Routes>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
