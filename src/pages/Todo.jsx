import React, { useEffect, useState } from 'react';
import TodoForm from '../components/TodoForm';
import { TodoList } from '../components/TodoList';
import { ToastItem } from '../components/ToastItem';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'reactstrap';
import { useParams, useNavigate } from "react-router-dom";

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState('');
    const { userid } = useParams();
    const navigate = useNavigate();
  
    const getTodos = async () => {
      const response = await axios.get(`/api/todo/${userid}`);
      if(response.data.error){
        navigate('/error');
        return;
      }
      setTodos(response.data);
    };
  
    useEffect(() => {
      getTodos();
    }, [setTodos]);

    const logoutFun = async () => {
      const response = await axios.get('/api/user/logout');
      navigate('/');
    }
  
    return (
      <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
        <div>
          {message&&<ToastItem message={message} setMessage={setMessage}/>}
          <h1 
            className={"text-center my-3"}>
              Todo App
          </h1>
          
          <TodoForm 
            className={"d-flex justify-content-Center"} 
            getTodos={getTodos}
            setMessage={setMessage}
          />
          <TodoList
            todos={todos}
            setTodos={setTodos}
            getTodos={getTodos}
            setMessage={setMessage} 
          />

          <Button onClick={logoutFun} color="danger" size="sm" className='d-block m-auto'>
            ログアウト
          </Button>

        </div>
      </Container>
    );
}
