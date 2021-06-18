import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const EditTodo = ({todo}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState(todo.description);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const cancelEdit = () => {
        setOpen(false);
        setDescription(todo.description);
    };

    const updateDescription = async() => {
        const id = todo.todo_id;
        const body = {description};
        await fetch(`https://pern-todo33.herokuapp.com/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <EditIcon />
            </IconButton>
            <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            >
            <Fade in={open}>
                <div className={classes.paper}>
                    <h2 >Edit Todo</h2>
                    <div>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth={true}
                        multiline={false}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={1}
                        style={{width: "320px"}}
                    />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth="true"
                        style={{marginTop:"20px"}}
                        onClick={updateDescription}
                    >Edit</Button>
                    <Button
                        variant="contained"
                        fullWidth="true"
                        style={{marginTop:"10px"}}
                        onClick={cancelEdit}
                    >Cancel</Button>
                </div>
            </Fade>
            </Modal>
        </>
    );
};

export default EditTodo;
