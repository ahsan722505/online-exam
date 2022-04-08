import { useState,useEffect } from "react";
import useHttp from "../../hooks/use-http";
import ExamTeacherPreview from "./ExamTeacherPreview";
import styles from "./ViewExams.module.css";
const ViewExams=()=>{
   const [exams,setExams]=useState([]);
    const {sendRequest,isLoading}=useHttp();
    useEffect(()=>{
        const dataHandler=(resData)=>{
            console.log(resData);
            if(!resData.errors){
                console.log(resData.data.getTeacherExams);
                setExams(resData.data.getTeacherExams);
            }
        }
        const graphqlQuery = {
            query: `
              {
                getTeacherExams {
                  _id
                  subjectName
                  examName
                }
              }
            `
          };
        sendRequest(graphqlQuery,dataHandler);

    },[])
    return(
        <>
            { isLoading && <h1>Loading...</h1>}
        
            { !isLoading &&<>
                <h1 className={styles.heading}>My exams</h1>
                <div className={styles.cont}>
                    {exams.map(each=>{
                        return(
                            <ExamTeacherPreview exam={each}/>
                        )
                    })}

                </div>

            </>}
        </>
    ) 
}
export default ViewExams;