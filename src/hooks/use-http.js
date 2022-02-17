import React from 'react'
import { useCallback } from 'react';
import { useState } from 'react'
const useHttp = () => {
    const [isLoading,setLoading]=useState(false);
    const sendRequest=useCallback(async(graphqlQuery,applyData)=>{
        setLoading(true);
        const res=await fetch(process.env.REACT_APP_SERVER,{
            method : "POST",
            headers : {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
              },
              body : JSON.stringify(graphqlQuery)

        });
        const resData=await res.json();
        applyData(resData);
        setLoading(false);

    },[]);
    return {
        isLoading,
        sendRequest
    }
}

export default useHttp