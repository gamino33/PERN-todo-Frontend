import React,{useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const InputTodo = (props) => {
    const [description, setDescription] = useState("");

    const addTodo = async(e) => {
        if (description !== "") {
            const body = {description};
            const newTodo = await fetch("https://pern-todo33.herokuapp.com/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const newTodoData = await newTodo.json();
            setDescription("");
            props.setTodo(newTodoData);
            //window.location = "/";
        }
    };


    return (
        <>
            <h1>PERN TodoList</h1>
            <TextField
                id="outlined-basic"
                label="Enter the task..."
                variant="outlined"
                fullWidth={true}
                multiline={false}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={1}
                autoComplete="off"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={addTodo}
                fullWidth="true"
                style={{marginTop: "10px"}}
            >ADD</Button>
        </>
    );
};

export default InputTodo;
