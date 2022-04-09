import { useState,useEffect } from "react";
import useHttp from "../../hooks/use-http";
import ExamTeacherPreview from "./ExamTeacherPreview";
import styles from "./ViewExams.module.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
const ViewExams=()=>{
    const dispatch=useDispatch();
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
    const deleteExamHandler=(id)=>{
        const graphqlQuery = {
            query: `
              mutation deleteExam($examId : ID) {
                deleteExam(examId : $examId) {
                  success
                }
              }
            `,
            variables: {
              examId : id
            }
          };
          const dataHandler=(resData)=>{
            setExams(state=> state.filter(each=> each._id !== id));
            dispatch(uiActions.showModal({content : "Exam deleted successfully."}))
          }
          sendRequest(graphqlQuery,dataHandler)
    }
    return(
        <>
            { isLoading && <h1>Loading...</h1>}
        
            { !isLoading &&<>
                <h1 className={styles.heading}>My exams</h1>
                <div className={styles.cont}>
                    {exams.map(each=>{
                        return(
                            <ExamTeacherPreview onDeleteExam={deleteExamHandler} exam={each}/>
                        )
                    })}

                </div>

            </>}
        </>
    ) 
}
export default ViewExams;