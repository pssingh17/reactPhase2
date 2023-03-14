import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { userData } from "./UserDataReducer/UserDataSlice";
import { createSlice } from '@reduxjs/toolkit'
import { Navbar } from "./common/Navbar";
import { ListingDataInterface } from '../model/ListingDataInterface'
import ListingCard from './ListingCard'
import { allListingsData } from './AllListingsReducer/AllListingsSlice'



export const Search = () => {
    const [data, setData] = useState <String []>([]);
    const dispatch = useDispatch();


    useEffect(() => {
        axios.post("/api/getAll").then(res=>{
            console.log(res.data)
            setData(res.data.newData)
            dispatch(allListingsData(res.data))
        }).catch(err=>{console.log(err)})
        // .then((response) => response.json())
        // .then(setData);
    }, []);

    return (<>
 
 
        {data?data.map((item : any)=>{
            return (
                
                <ListingCard key={item._id || item.host.host_id} listing={item}/>
            )
    
        })
        :
        "NO data found"}
        <Navbar name={JSON.stringify(data)} />
        </>
      )
    
}
