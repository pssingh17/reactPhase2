
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Cookies } from 'react-cookie';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { userData } from '../UserDataReducer/UserDataSlice';
import axios from 'axios';

export const Navbar = (props:any) => {
	const cookies = new Cookies()
	const [loggedIn, setLoggedIn] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [searchInput, setSearchInput] = useState('');

	let userLogin: any = useSelector((state: RootState) => state.UserDataSlice.value)
	useEffect(() => {
		let cookieCheck = cookies.get("token")
		// console.log("cookieCheck", cookieCheck)
		if (cookieCheck != undefined) {
			setLoggedIn(true)
		}
		else {
			setLoggedIn(false)
		}
		if (cookieCheck != undefined) {
			axios({
				method: 'post',
				url: '/MyUserProfile',
				headers: {
					Authorization: `Bearer ${cookieCheck}`,
					'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
				}
			}).then(res => {
				// console.log("rrsponse from Uprofile",res.data)
				dispatch(userData(res?.data))
			}).catch(err => {
				console.log("Error-", err)

			})
		}
	}, [])
	useEffect(() => {
		let cookieCheck = cookies.get("token")
		// console.log("cookieCheck", cookieCheck)
		if (cookieCheck != undefined) {
			setLoggedIn(true)
		}
		else {
			setLoggedIn(false)
		}
		if (cookieCheck != undefined) {
			axios({
				method: 'post',
				url: '/MyUserProfile',
				headers: {
					Authorization: `Bearer ${cookieCheck}`,
					'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
				}
			}).then(res => {
				// console.log("rrsponse from Uprofile",res.data)
				dispatch(userData(res?.data))
			}).catch(err => {
				console.log("Error-", err)

			})
		}
	}, [userLogin])
	const logout = () => {
		cookies.remove('token')
		setLoggedIn(false)
		dispatch(userData([]))
		navigate('/')
	}
	const searchItems = (searchValue:any) => {
		setSearchInput(searchValue)
		console.log(searchValue)
		console.log("props.data" + props.name)
		// if(searchInput !== '') {
		//   const filteredData = props.name.filter((item: any) => {
		//     return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
		//   })
		//   setFilteredResults(filteredData)
		// }
		// else{
		//   setFilteredResults(props.name)
		// }
		
	  }
	
	  // const filteredData = props.name.filter((item : any) => {
	  //   return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
	  // })
	
	  // const [filteredResults, setFilteredResults] = useState([]);
	return (
		<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
			<div className="container-fluid">
			
				
			
				<NavLink to="/" className="nav-link"  style={{ padding: "21px", color: "grey" }} >Home</NavLink>

				{loggedIn === true || userLogin?.token ? <>
					<NavLink to="/trending" className="nav-link"  style={{ padding: "21px", color: "grey" }}>Trending</NavLink>
					<NavLink to="/toprated" className="nav-link" style={{ padding: "21px", color: "grey" }}>Top Rated</NavLink>
					<NavLink to="/toppicks" className="nav-link" style={{ padding: "21px", color: "grey" }}>Top Picks</NavLink>
				</> :
				""
				}
				<NavLink to="advanceFilters" className="nav-link" style={{ padding: "21px", color: "grey" }}>Advance Filters</NavLink>

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => searchItems(e.target.value)}
            />
            <Link
              className="btn btn-outline-success"
              type="submit"
              to="/search"

            >
              Search
            </Link>
          </form>
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						{loggedIn === true || userLogin?.token ? <>
							<div className="dropdown">
								<button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									{userLogin?.credentials?.email}
								</button>
								<ul className="dropdown-menu">
									<NavLink to="/myFavourites" className="dropdown-item" style={{ textDecoration: "none" }}>My Favourites</NavLink>
									<li><a className="dropdown-item " style={{ cursor: "pointer" }} onClick={logout}>Logout</a></li>
								</ul>
							</div>
						</> :
							<li className="nav-item ">
								<NavLink to="/login" className="nav-link">Login</NavLink>
							</li>
						}
					</ul>
				</div>
			</div>
		</nav>
	)
}
