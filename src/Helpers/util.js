export const questions=[{id : "ueh83",statement : "What is your name?" , options : [{statement : "ahsan"},{statement : "jav"},{statement : "jav2"}]},{id : "8973gdg",statement : "What is your hobby?" , options : [{statement : "coding"},{statement : "cricket"},{statement : "football"}]},{id : "823gg",statement : "What is your age?" , options : [{statement : "12"},{statement : "13"},{statement : "14"}]}];
export const exams=[
    {
        name : "quiz 1",
        subject : "oop",
        teacher : "Abdul Mateen"
    },
    {
        name : "mid",
        subject : "coal",
        teacher : "Dr. Abdullah"
    },
    {
        name : "final",
        subject : "calculus",
        teacher : "Farsia"
    },
    {
        name : "final",
        subject : "calculus",
        teacher : "Farsia"
    },
];
export const classes=["cs-mor","se-aft","se-mor","cs-aft","bsit","bsait","bsph"]
export const months=["Jan","Feb","Mar","April","May","June","July","August","Sep","Oct","Nov","Dec"];
export const isEmpty=(content)=>{
    return content.trim().length === 0;
}
export const getGraphqlQuery=(examId)=>{
    let graphqlQuery;
    if(examId){
        graphqlQuery = {
            query: `
            query allInOne($_id : ID,$start : Boolean){
            
                getClasses {
                  name
                  _id
                }
            
                getExamContents(examId : $_id,start : $start) {
                  examName
                  subjectName
                  class {
                      name
                  }
                  questions {
                      questionStatement
                      options {
                          statement
                      }
                  }
                  duration
                  dateAndTime
                  instructions {
                      instruction
                  }
                  correctOptions
                }
              
            }
            
              
            `
          , variables : {
              _id : examId,
              start : false
          }};
    }else{
        graphqlQuery = {
            query: `
              {
                getClasses {
                  name
                  _id
                }
              }
            `};
    }
    return graphqlQuery;
    
}