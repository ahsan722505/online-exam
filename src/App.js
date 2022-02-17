import './App.css';
import Landing from './components/Landing/Landing';
import StudentMain from "./components/Student/StudentMain";
import Exam from "./components/Student/Exam/Exam";
import TeacherMain from './components/Teacher/TeacherMain';
import CreateExam from './components/Teacher/CreateExam/CreateExam';
import ViewResults from './components/Teacher/ViewResults';
import PageNotFound from './components/PageNotFound';
import Login from './components/Landing/Login';
import { Route, Routes} from 'react-router-dom';
import CustomModal from "./UI/CustomModal";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/student" element={<StudentMain/>}/>
        <Route path="/student/:examId" element={<Exam/>}/>
        <Route path="/teacher" element={<TeacherMain/>}/>
        <Route path="/teacher/createExam" element={<CreateExam/>}/>
        <Route path="/teacher/viewResults" element={<ViewResults/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      <CustomModal/>
    </div>
  );
}

export default App;
