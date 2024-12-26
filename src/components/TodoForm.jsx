import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Button, InputGroup, InputGroupText } from 'reactstrap';
import { useParams } from "react-router-dom";


const TodoForm = ({getTodos, setMessage}) => {
  const [text, setText] = useState('');
  const { userid } = useParams();

  const addTodo = async (e) => {
    const res = await axios.post(`/api/todo/${userid}`, { text });
    setMessage(res.data.success);
    setText('');
    getTodos();
  };

  return (
    <InputGroup>
      <Input
        type="text"
        value={text}
        onChange={(e)=>setText(e.target.value)}
        required />
      <InputGroupText className="p-0">
        <Button color="warning" type="submit" onClick={addTodo}>
          新規登録
        </Button>
      </InputGroupText>
    </InputGroup>
  );
};

export default TodoForm;
