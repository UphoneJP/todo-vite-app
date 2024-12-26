import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export default function Index() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('');

    const navigate = useNavigate();

    async function loginFun(username, password) {
        const response = await axios.post('/api/user/login', {username, password});
        if(response.data._id){
            navigate(`/todo/${response.data._id}`)
        } else {
            setAlert('エラーが発生しました。もう一度ログインしてください。');
            setUsername('');
            setPassword('');
        }
    }
    async function registerFun(username, password) {
        const response = await axios.post('/api/user/register', {username, password});
        if(response.data._id){
            navigate(`/todo/${response.data._id}`);
            return;
        } else {
            setAlert('エラーが発生しました。もう一度登録してください。');
            setUsername('');
            setPassword('');
        }
    }
  
    return (
      <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
        <div>
            <h1 className={"text-center my-5"}>
                Todo App
            </h1>
            {alert&&<p class="text-danger">{alert}</p>}
            <FormGroup>
                <Label for="username">
                    ユーザー名
                </Label>
                <Input
                    id="username"
                    type="text"
                    value={username} 
                    onChange={(e)=>setUsername(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="password">
                    パスワード
                </Label>
                <Input
                    id="password"
                    type="password"
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </FormGroup>

            <div className="d-flex gap-2 justify-content-center my-5">
                <Button color="primary" onClick={()=>loginFun(username, password)}>ログイン</Button>
                <Button color="success" onClick={()=>registerFun(username, password)}>新規登録</Button>
            </div>
        </div>
      </Container>
    );
}
