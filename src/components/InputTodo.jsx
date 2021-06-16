import React,{useState} from "react";
import TextField from "@material-ui/core/TextField";


const InputTodo = () => {

    const [description, setDescription] = useState("");

    const handleKeyDown = async(e) => {
        if (e.key === 'Enter' && description !== "") {
            const body = {description};
            await fetch("https://pern-todo33.herokuapp.com/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            setDescription("");
            window.location = "/";
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
                onKeyDown={handleKeyDown}
                rows={1}
            />

        </>
    );
};

export default InputTodo;
