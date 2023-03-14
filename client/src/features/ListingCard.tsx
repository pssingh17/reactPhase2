import React, { useEffect, useState } from 'react'
import { ListingDataInterface } from '../model/ListingDataInterface'
import type { RootState } from '../app/store'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie';
import axios from 'axios';
import { favouriesData } from './UserDataReducer/FavouritesReducer';
import { userData } from './UserDataReducer/UserDataSlice';
import { Link, Route } from 'react-router-dom';
import { ViewDetails } from './ViewDetails';

interface listingsProp {
	listing: ListingDataInterface
}

const ListingCard = (props: listingsProp) => {
	// const listingsData = useSelector((state: RootState) => state.AllListingsSlice.value)
	let userLogin: any = useSelector((state: RootState) => state.UserDataSlice.value)

	// @ts-ignore
	const MyFavouritesRedux = useSelector((state: RootState) => state.Favourites?.value?.favourites);

	const [addedToFavourites, setAddedToFavourites] = useState(false)

	const [viewDetail, setViewDetail] = useState()

	const cookies = new Cookies()
	const dispatch = useDispatch()
	const [addFav, setAddFav] = useState(false)

	let style = {
		width: "20rem"
	}

	const addFavourite = (data: any) => {
		// console.log("data in function add fav:", data)
		let token = cookies.get("token");
		let newData = {
			...data,
			fav_id: data._id || data?.listing_url?.substring(
				data?.listing_url?.lastIndexOf("/") + 1
			),
			date: Date.now()
		};
		axios({
			method: "post",
			url: "/user/addToFavourites",
			data: newData,
			headers: {
				Authorization: `Bearer ${token}`,
				"content-type": "application/x-www-form-urlencoded;charset=utf-8",
			},
		}).then((res) => {
			// console.log("resp favourites", res)
			dispatch(favouriesData(res.data.credentials))
			//  alert("Successfully added")
		}).catch(err => {
			console.log("Error-", err)
		});
	}

	const removeFromFavourites = (data: any) => {

		let token = cookies.get("token");
		let newData = {
			...data,
			fav_id: data._id || data.listing_url.substring(
				data.listing_url.lastIndexOf("/") + 1
			),
		};
		// console.log("RF:", newData)
		axios({
			method: "post",
			url: "/user/removeFromFavourites",
			data: newData,
			headers: {
				Authorization: `Bearer ${token}`,
				"content-type": "application/x-www-form-urlencoded;charset=utf-8",
			},
		}).then((res) => {
			// console.log("rrsponse from favourites", res.data);
			setAddedToFavourites(false)
			dispatch(favouriesData(res.data.credentials))
			// dispatch(addFavouritesData(viewDetailsRedux))
		}).catch(err => {
			console.log("Error-", err)
		});
	};

	const viewDetails = (data: any) => {

		let token = cookies.get("token");
		let newData = {
			...data,
			fav_id: data._id || data.listing_url.substring(data.listing_url.lastIndexOf("/") + 1),
		};
		// console.log("RF:", newData)
		axios({
			method: "post",
			url: "/user/viewDetails",
			data: newData,
			headers: {
				Authorization: `Bearer ${token}`,
				"content-type": "application/x-www-form-urlencoded;charset=utf-8",
			},
		}).then((res) => {
			// console.log("rrsponse from favourites", res.data);
			setAddedToFavourites(false)
			dispatch(favouriesData(res.data.credentials))
			// dispatch(addFavouritesData(viewDetailsRedux))
		}).catch(err => {
			console.log("Error-", err)
		});
	};

	useEffect(() => {
		let token = cookies.get("token");

		axios({
			method: "post",
			url: "/user/MyUserProfile",
			headers: {
				Authorization: `Bearer ${token}`,
				"content-type": "application/x-www-form-urlencoded;charset=utf-8",
			},
		}).then((res) => {

			// console.log("rrsponse from favourites", res.data);
			//  dispatch(userData(res.data))
			dispatch(favouriesData(res.data.credentials));
			// console.log("User state data" , userDataState)
		}).catch(err => {
			console.log("Error-", err)
		});

	}, []);
	useEffect(() => {
		// console.log("MyFavouritesRedux", MyFavouritesRedux)
		// @ts-ignore
		let favId = props.listing?._id || props.listing?.listing_url.substring(props.listing.listing_url.lastIndexOf("/") + 1)
		// console.log("favid", favId)
		let data = MyFavouritesRedux?.filter((fav: any) => { return fav.fav_id === favId })
		if (data?.length > 0) {
			// console.log("Inside lengthj")
			setAddedToFavourites(true)
		}
		else {
			setAddedToFavourites(false)
		}
	}, [MyFavouritesRedux])

	return (

		<div className="card col-sm-4  mx-auto m-2" style={style} >
			{props.listing.images ?
				<img style={{ width: "300px", height:"200px" }} src={props.listing.images.picture_url} className="card-img-top" alt="No image" /> :
				<img src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="card-img-top" alt="No image" />
			}

			<div className="card-body d-flex flex-column">
				<h5 className="card-title">{props.listing.name.slice(0, 50)}...</h5>
				{props.listing.summary ? <p className="card-text text-justify">{props.listing.summary.slice(0, 150)}...</p> : ""}
				{userLogin?.credentials?.email ? <
					>
					{addedToFavourites === true ? <>
						<button className="btn btn-dark mt-auto customBtnPosition my-1" onClick={() => removeFromFavourites(props.listing)}>Remove from Favourites</button>
					</> : <button className="btn btn-dark mt-auto customBtnPosition my-1" onClick={() => addFavourite(props.listing)}>Add to Favourites</button>}

					<button className="btn btn-dark customBtnPosition my-1" >Book a Room</button>
				</> : ""}
				{userLogin?.credentials?.email  ? <>
					<button className="btn btn-dark customBtnPosition my-1" onClick={() => viewDetails(props.listing)}> View Details </button>
				</>:<>
				<button className="btn btn-dark customBtnPosition my-1 mt-auto" onClick={() => viewDetails(props.listing)}> View Details </button>
				</>}
				
			</div>
		</div>
	)
}

export default ListingCard