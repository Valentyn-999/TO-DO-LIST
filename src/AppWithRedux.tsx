import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodoListAC
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

//ok
    const removeTask = useCallback ((id: string, todolistId: string) => {
        dispatch(RemoveTaskAC(id, todolistId))
    }, [dispatch])
//ok
    const addTask = useCallback ((title: string, todolistId: string) => {
        dispatch(AddTaskAC(title, todolistId))
    }, [dispatch])
//ok
    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(ChangeTaskStatusAC(id, isDone, todolistId))
    }, [dispatch])
//ok
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(ChangeTaskTitleAC(id, newTitle, todolistId))
    }, [dispatch])
//ok
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodolistFilterAC(value, todolistId))
    }, [dispatch])
//ok
    const removeTodolist = useCallback((id: string) => {
        dispatch(RemoveTodoListAC(id))
    }, [dispatch])
//ok
    const changeTodolistTitle = useCallback((id: string, title: string) =>  {
        dispatch(ChangeTodolistTitleAC(id, title))
    }, [dispatch])
//ok
    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        _addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        _removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        _changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
