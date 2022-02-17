import { Link } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Landing=()=>{
    const initialLoading=useSelector(state=>state.ui.initialLoading);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    const graphqlQuery = {
      query: `
        {
          initialRequest {
            role
            userId
          }
        }
      `
    };
    fetch(process.env.REACT_APP_SERVER,{
      method : "POST",
      headers : {
        Authorization: 'Bearer ' + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(graphqlQuery)
    }).then(res=>  res.json()).then(resData=>{
      if(!resData.errors){
        navigate(`/${resData.data.initialRequest.role}`);
      }
       dispatch(uiActions.toggleInitialLoading())
      }).catch(err=>console.log(err));
  },[]);
 return(
     <>
        {initialLoading && <h1>Loading...</h1>}
        { !initialLoading && <Link to="/login">Login</Link>}     
    </>
 )
}
export default Landing;