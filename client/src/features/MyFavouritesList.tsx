import axios from "axios";
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

import { useNavigate } from "react-router-dom";
import { favouriesData } from "./UserDataReducer/FavouritesReducer";

export const MyFavouritesList = () => {
	let cookies = new Cookies();
	let dispatch = useDispatch();
	let navigate = useNavigate()

	// @ts-ignore
	const MyFavouritesRedux = useSelector((state: RootState) => state.Favourites?.value?.favourites
	);

	const [userFavouritesState, setUserFavouritesState] = useState<String[]>(MyFavouritesRedux);
	const [errorImage, setErrorImage] = useState(
		"https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
	);
	// console.log("My fav redux:", MyFavouritesRedux);
	// @ts-ignore
	const replaceImage = (error) => {
		//replacement of broken Image
		error.target.src = errorImage;
	};
	const removeFromFavourites = (favId: any) => {

		let token = cookies.get("token");
		let newData = {
			fav_id: favId,
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
			// console.log("rrsponse from myfavourites page", res.data);
			setUserFavouritesState(res.data?.credentials?.favourites)
			dispatch(favouriesData(res.data?.credentials?.favourites));
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
			setUserFavouritesState(res.data?.credentials?.favourites);
			dispatch(favouriesData(res.data.credentials));
			// console.log("User state data" , userDataState)
		}).catch(err => {
			console.log("Error-", err)
		});
	}, []);


	return (
		<>
			<h3 className="text-start mb-5 ml-2 mt-2">
				<i>My Favourites</i>
			</h3>

			{userFavouritesState?.length > 0
				? userFavouritesState?.map((fav: any) => {
					return (
						<div className="fav-container-child mb-3 d-flex" key={fav.fav_id}>
							{fav?.images?.picture_url ? (
								<img
									style={{
										width: "300px",
										height: "250px",
										borderRadius: "20px",
									}}
									src={fav?.images?.picture_url}
									className="card-img-top custom-booking-image"
									alt="No image found"
									onError={replaceImage}
								/>
							) : (
								<img
									style={{
										width: "20%",
										height: "20%",
										borderRadius: "20px",
									}}
									src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
									className="card-img-top custom-booking-image"
									alt="No image found"
									onError={replaceImage}
								/>
							)}
							<div className="fav-details">
								<h4 className="text-start m-2">
									<i>{fav.name}</i>
								</h4>
								{fav?.address?.street ? (
									<>
										<p className="text-start m-2">
											<b>Location :</b> <i> {fav?.address?.street},
												{fav?.address?.government_area},
												{fav?.address?.country}</i>
										</p>
									</>
								) : (
									<p className="text-start m-2"><b> Address :</b><i> {fav?.address}</i></p>
								)}
								<p className="text-start m-2"><b>Rating :</b> {fav?.review_scores?.review_scores_rating || "No Ratings Yet"}
									<i style={{ fontWeight: "400" }}> {fav?.number_of_reviews && fav?.review_scores?.review_scores_rating ? <>({fav?.number_of_reviews})</> : ""}</i>
								</p>
								<p className="text-start m-2">
									<b> Price : </b><i>${fav.price} Per Night</i>
								</p>
								<div className="text-start">
									<button
										className="btn btn-dark m-2 px-3 customBtnHover text-start"
										style={{ width: "fit-content" }}
									>
										Book A Room
									</button>
									<button
										className="btn btn-dark m-2 px-3 customBtnHover text-start"
										style={{ width: "fit-content" }}
										onClick={() => { removeFromFavourites(fav.fav_id) }}
									>
										Remove From Favourites
									</button>
								</div>
							</div>
						</div>
					);
				})
				: <><h3>Favourites List Empty</h3>
					<button className='btn btn-dark customBtnHover' style={{ width: "10rem" }} onClick={() => { navigate('/') }}>Browse Now</button>
				</>}
		</>
	);
};
