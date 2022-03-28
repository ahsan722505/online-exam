import React from 'react'
import { useCallback } from 'react';
import { useState } from 'react'
const useHttp = (initialLoading=false) => {
    const [isLoading,setLoading]=useState(initialLoading);
    const sendRequest=useCallback(async(graphqlQuery,applyData,loading=true)=>{
        try{
            if(loading) setLoading(true);
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
            if(loading) setLoading(false);
        }catch(err){
            console.log("catching err");
            applyData(err);
            if(loading) setLoading(false);
            
        }

    },[]);
    return {
        isLoading,
        sendRequest
    }
}

export default useHttp