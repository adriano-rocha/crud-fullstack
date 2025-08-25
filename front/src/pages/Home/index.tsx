// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from '../../services/api';

function Home() {
  const [students, setStudents] = useState([])

  const inputName = useRef()
  const inputEmail = useRef()
  const inputSr = useRef()
  const inputCourse = useRef()

  async function getStudents(){
    const studentsApi = await api.get('/students')

    setStudents(studentsApi.data)    
  }
  
 async function createStudents(){
  console.log("🔵 Tentando criar estudante...");
  
  const studentData = {
    name: inputName.current.value,
    email: inputEmail.current.value,
    sr: parseInt(inputSr.current.value),
    course: inputCourse.current.value
  };
  
  console.log("📝 Dados a serem enviados:", studentData);
  
  try {
    const response = await api.post('/students', studentData);
    console.log("✅ Resposta do servidor:", response.data);
    
    // Limpar os campos após sucesso
    inputName.current.value = '';
    inputEmail.current.value = '';
    inputSr.current.value = '';
    inputCourse.current.value = '';
    
    getStudents();
  } catch (error) {
    console.log("❌ Erro ao criar estudante:", error);
    alert("Erro ao criar estudante!");
  }
}

    async function deleteStudents(id){
    await api.delete(`/students/${id}`)

     getStudents()
  }
  useEffect(() => {
    getStudents()
  }, [])

  return (
    <div className="container">
      <form>
        <h1>Student Registration</h1>  
        <input placeholder="Name" name="name" type="text" ref={inputName}/>
        <input placeholder="E-mail" name="email" type="email" ref={inputEmail} />
        <input placeholder="SR" name="SR" type="text" ref={inputSr} />
        <input placeholder="Course" name="course" type="text" ref={inputCourse}/>
        
        <button type="button" onClick={createStudents}>Register</button>
      </form>

      {students.map((student) => (
        <div key={student.id} className="card">
          <div>
            <p>Name: <span>{student.name}</span></p>
            <p>E-mail: <span>{student.email}</span></p>
            <p>SR: <span>{student.sr}</span></p>
            <p>Course: <span>{student.course}</span></p>            
          </div>
          <button onClick={() => deleteStudents(student.id)}>
            <img src={Trash} alt="Delete" />
          </button>
        </div>
      ))}

    </div>
  );
}

export default Home;
