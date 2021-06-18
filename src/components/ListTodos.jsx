import React, {useState, useEffect} from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/styles";
import EditTodo from "./EditTodo";

const useStyles = makeStyles({
    iconCell: {
        padding: 0,
        height: 28,
        width: 48
    }
})

const ListTodos = () => {

    const [todos, setTodos] = useState([]);
    const classes = useStyles();

    const deleteTodo = async(id) => {
        try {
            await fetch(`https://pern-todo33.herokuapp.com/todos/${id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    const getTodos = async() => {
        try {
            const response = await fetch("https://pern-todo33.herokuapp.com/todos")
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (err) {
            console.error(err.messsage);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <>
        <TableContainer style={{ marginTop: "85px"}}>
            <h1>TODO LIST</h1>
            <Table>
                <TableBody>
                    {todos.length > 0 && (
                        todos.map( todo => (
                            <TableRow key={todo.todo_id}>
                                <TableCell>
                                    <h2>{todo.description}</h2>
                                </TableCell>
                                <TableCell className={classes.iconCell}>
                                    <EditTodo todo={todo}/>
                                </TableCell>
                                <TableCell className={classes.iconCell}>
                                    <IconButton  onClick={() => deleteTodo(todo.todo_id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )



}

export default ListTodos;
