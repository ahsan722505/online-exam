import styles from "./StudentMain.module.css";
// import { exams } from "../../Helpers/util";
import ExamPreview from "./ExamPreview"
import useHttp from "../../hooks/use-http";
import { useEffect,useState } from "react";
const StudentMain=()=>{
    const [exams,setExams]=useState([]);
    const {sendRequest,isLoading}=useHttp();
    useEffect(()=>{
        const dataHandler=(resData)=>{
            console.log(resData);
            if(!resData.errors){
                console.log(resData.data.getExams);
                setExams(resData.data.getExams);
            }
        }
        const graphqlQuery = {
            query: `
              {
                getExams {
                  _id
                  subjectName
                  examName
                  teacherId{
                      username
                  }
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
                            <ExamPreview exam={each}/>
                        )
                    })}

                </div>

            </>}
        </>
    )
}
export default StudentMain;