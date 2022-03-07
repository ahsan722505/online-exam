export const createExamReducer=(state,action)=>{
    let updatedQuestions,updatedInstructions;
    switch (action.type) {
        case "examName":
            return {...state,examName : action.payload}
        case "subjectName":
            return {...state,subjectName : action.payload}
        case "class_Name":
            return {...state,class_Name : action.payload}
        case "addOption":
            updatedQuestions=[...state.questions];
            updatedQuestions[state.currentQuestion].options.push({statement : ""});
            return {...state,questions : updatedQuestions}
        case "removeOption":
            updatedQuestions=[...state.questions];
            updatedQuestions[state.currentQuestion].options=updatedQuestions[state.currentQuestion].options.filter((_,i)=> i!== action.payload);
            return {...state,questions : updatedQuestions}
        case "qStatement":
            updatedQuestions=[...state.questions];
            updatedQuestions[state.currentQuestion].questionStatement=action.payload;
            return {...state,questions : updatedQuestions}
        case "option":
            updatedQuestions=[...state.questions];
            updatedQuestions[state.currentQuestion].options[action.payload.index].statement=action.payload.value;
            return {...state,questions : updatedQuestions}
        case "nextQuestion":
            updatedQuestions=[...state.questions];
            if(state.currentQuestion === state.questions.length-1){
                updatedQuestions.push({questionStatement : "", options : [{statement : ""}]});
            }
                return {...state,questions : updatedQuestions,currentQuestion : state.currentQuestion+1};

        case "deleteQuestion":
            let updatedCurrentQuestion=state.currentQuestion;
            if(state.currentQuestion === state.questions.length-1) updatedCurrentQuestion--;
            updatedQuestions=state.questions.filter((_,i)=> state.currentQuestion !== i);
            return {...state,questions : updatedQuestions,currentQuestion : updatedCurrentQuestion};
        case "currentQuestion":
            return {...state,currentQuestion : action.payload}
        case "changeInstruction":
            updatedInstructions=[...state.instructions];
            updatedInstructions[action.payload.index].instruction=action.payload.value;
            return {...state,instructions : updatedInstructions};
        case "removeInstruction":
            updatedInstructions=state.instructions.filter((_,i)=> i !== action.payload);
            return {...state,instructions : updatedInstructions};
        case "addInstruction":
            updatedInstructions=[...state.instructions];
            updatedInstructions.push({instruction : ""});
            return {...state,instructions : updatedInstructions};



            
    }
}