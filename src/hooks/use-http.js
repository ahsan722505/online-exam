import React from 'react'
import { useCallback } from 'react';
import { useState } from 'react'
const useHttp = () => {
    const [isLoading,setLoading]=useState(true);
    const sendRequest=useCallback(async(graphqlQuery,applyData)=>{
        const res=await fetch("http://localhost:8080/graphql",{
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