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

// import Cookies from 'js-cookie'

type FormValues = {
	email: string;
	password: string;
};

export const Login = () => {
	// const cookies = new Cookies();
	const navigate = useNavigate();
	const dispatch = useDispatch()
	const cookies = new Cookies()
	const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

	const [showGreen, setShowGreen] = useState(false);
	const [showRed, setShowRed] = useState(false)
	const [alertValue, setAlertValue] = useState()


	const onSubmit: SubmitHandler<FormValues> = ((data) => {

		var body = {
			"email": data.email,
			"password": data.password,
			"userType": "User"
		}
		// console.log(data)
		axios({
			method: 'post',
			url: '/login',
			data: body,
			headers: {
				'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
			}
		}).then(res => {
			// let cookieCheck = cookies.get("token")
			// console.log("Response check:",res.data, "cookieCheck",cookieCheck)
			if (res?.data?.token) {

				setShowGreen(true)
				setAlertValue(res.data.message)
				dispatch(userData(res.data))
				cookies.set("token", res.data.token, { path: '/' })
			}
			else {
				setShowRed(true)
				setAlertValue(res.data.message)
			}
			cookies.set("token", res.data.token, { path: '/' })
		})
			// console.log(res.data)
			.catch(err => { console.log(err) })
	});
	// useEffect(()=>{console.log("fields",fields)},[fields])

	return (
		<>
			<div className="d-flex justify-content-center">
				{showGreen ? <>
					<Alert className="col-12 col-md-8 col-lg-6 p-1 d-flex align-items-center justify-content-between" show={showGreen} variant="success" style={{ position: "sticky", top: "0px", height: "3rem" }}>
						<p style={{ marginBottom: "0" }}>{alertValue}</p>
						<Button style={{ fontSize: "80%" }} onClick={() => {
							setShowGreen(false)
							navigate('/')
						}
						} variant="outline-success">
							Close
						</Button>
					</Alert>
				</> : <>
					<Alert className="col-12 col-md-8 col-lg-6 p-1 d-flex align-items-center justify-content-between mx-2" show={showRed} variant="danger" style={{ position: "sticky", top: "0px", height: "3rem" }}>
						<p style={{ marginBottom: "0" }}>{alertValue}</p>
						<Button style={{ fontSize: "80%" }} onClick={() => setShowRed(false)} variant="outline-danger">
							Close
						</Button>
					</Alert></>
				}
			</div>

			<div className="vh-80 d-flex justify-content-center align-items-center">
				<div className="container">
					<div className="row d-flex justify-content-center">
						<div className="col-12 col-md-8 col-lg-6">
							<div className="card bg-white">
								<div className="card-body  customResp">
									<form className="mb-3 mt-md-4 " onSubmit={handleSubmit(onSubmit)}>
										<h5 className="fw-bold mb-2 text-uppercase text-s">
											Login into your User Account
										</h5>

										<div className="mb-3">
											<p className="form-label text-start ">Email address</p>
											<input
												type="email"
												className="form-control"
												{...register("email", {
													required: true,
													pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
												})}
											/>
											{errors.email && <p style={{ color: "red" }}>Enter Valid Email</p>}
										</div>
										<div className="mb-3">
											<p className="form-label text-start">Password</p>
											<input
												type="password"
												className="form-control"
												{...register("password", {
													required: true,
													pattern: /.{5,20}$/
												})}
											/>
											{errors.password && <p style={{ color: "red" }}>Password must be strong and minimum 5 Characters</p>}

										</div>
										{/* <p className="small"><a className="text-primary" href="forget-password.html">Forgot password?</a></p> */}

										<div className="d-grid">
											<button className="btn btn-outline-dark" type="submit">Login</button>
										</div>
									</form>
									<div>
										<p className="mb-0  text-center">

										</p>
										<p className="mb-0  text-center">
											Don't have an account?{" "}
											<Link to="/signUp" className="text-primary fw-bold">
												Sign Up
											</Link>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
