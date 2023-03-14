import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { userData } from "./UserDataReducer/UserDataSlice";

export const ViewDetails = () => {
    return (
		<div>
			<h1>View Details Page</h1>
		</div>
	);
};
