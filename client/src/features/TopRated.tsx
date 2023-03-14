import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { userData } from "./UserDataReducer/UserDataSlice";
import { allListingsData } from "./AllListingsReducer/AllListingsSlice";
import { favouriesData } from "./UserDataReducer/FavouritesReducer";
import ListingCard from "./ListingCard";


// import Cookies from 'js-cookie'
export const TopRated = () => {
	const [listings, setlistings] = useState<String[]>([])
	let cookies = new Cookies();

	const dispatch = useDispatch()

	useEffect(() => {
		axios.post("/api/topRated").then(res => {
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
