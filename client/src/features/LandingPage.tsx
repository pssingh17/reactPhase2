import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ListingCard from './ListingCard'
import { Cookies } from "react-cookie";

import { useDispatch } from 'react-redux'
import { allListingsData } from './AllListingsReducer/AllListingsSlice'
import { favouriesData } from './UserDataReducer/FavouritesReducer';
import { userData } from './UserDataReducer/UserDataSlice';

export const LandingPage = () => {
	const [listings, setlistings] = useState<String[]>([])
	let cookies = new Cookies();

	const dispatch = useDispatch()

	useEffect(() => {
		axios.post("/api/getAll").then(res => {
			// console.log(res.data)
			setlistings(res.data.newData)
			dispatch(allListingsData(res.data))
		}).catch(err => { console.log(err) })

		let token = cookies.get("token");

		if (token != undefined) {
			axios({
				method: "post",
				url: "/user/MyUserProfile",
				headers: {
					Authorization: `Bearer ${token}`,
					"content-type": "application/x-www-form-urlencoded;charset=utf-8",
				},
			}).then((res) => {

				// console.log("rrsponse from myProfile endpoint", res.data);
				dispatch(userData(res.data))
				dispatch(favouriesData(res.data.credentials));
				// console.log("User state data" , userDataState)
			}).catch(err => {
				console.log("Error-", err)
			});
		}

	}, [])
	return (<>


		{listings ? listings.map((item: any) => {
			return (

				<ListingCard key={item._id || item.host.host_id} listing={item} />
			)

		})
			:
			"NO data found"}

	</>
	)
}
