import { Button, Card, CardBody, Input } from 'reactstrap';
import axios from 'axios';
import { useParams } from "react-router-dom";

export const TodoList  = ({todos, setTodos, getTodos, setMessage}) => {
    const { userid } = useParams();

    const toggleFun = (todoid) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === todoid ? { ...todo, editing: !todo.editing } : todo
          )
        );
    };

    const editTodo = async (todoid, text) => {
        await axios.patch(`/api/todo/${userid}`, {todoid, text});
        setMessage("修正しました");
        getTodos();
    }

    const deleteTodo = async (todoid) => {
        await axios.delete(`/api/todo/${userid}/${todoid}`);
        setMessage("削除しました");
        getTodos();
    };

    return (<>
        {todos.map(todo=> (
            <Card key={todo._id} className='m-3'>
                <CardBody className='p-2'>
                    <p>id: {todo._id}</p>
                    {todo.editing? (
                        <Input
                            type="text" 
                            value={todo.text} 
                            onChange={(e) => setTodos( prevTodos =>
                                prevTodos.map(t => 
                                    t._id === todo._id ? {...t, text:e.target.value} : t
                            ))} />
                    ) : ( 
                        todo.text
                    )}
                </CardBody>

                <div className='mb-2 d-flex gap-2 justify-content-center'>
                    {!todo.editing? (
                        <>
                        <Button
                            value={todo._id}
                            color="primary"
                            onClick={()=>deleteTodo(todo._id)}>
                                完了
                        </Button>
                        <Button
                            color={"info"}
                            onClick={()=>toggleFun(todo._id)}>
                                編集
                        </Button>
                        </>
                    ) : (
                        <Button
                            color={"warning"}
                            onClick={()=>editTodo(todo._id, todo.text)}>
                                変更
                        </Button>
                    )}
                </div>
            </Card>
        ))}
    </>);
}
