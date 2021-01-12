import React, {useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';
import {TaskStatuses, TaskType} from './API/todolistAPI';
import {FilterValuesType} from './state/todolists-reducer';

// export type TaskType = {
//     id: string
//     title: string
//     status: TaskStatuses
// }

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    _addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    _removeTodolist: (id: string) => void
    _changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist: React.FC<PropsType> = React.memo( ({
                                                              id,
                                                              title,
                                                              tasks,
                                                              removeTask,
                                                              changeFilter,
                                                              _addTask,
                                                              changeTaskStatus,
                                                              _removeTodolist,
                                                              _changeTodolistTitle,
                                                              filter,
                                                              changeTaskTitle
                                                          }) => {

    const addTask = useCallback( (title: string) => {
        _addTask(title, id);
    }, [_addTask, id])

    const removeTodolist = useCallback(() => {
        _removeTodolist(id);
    },[_removeTodolist, id])

    const changeTodolistTitle = useCallback((title: string) => {
        _changeTodolistTitle(id, title);
    },[_changeTodolistTitle, id])

    const onAllClickHandler = useCallback(() => changeFilter("all", id),[])
    const onActiveClickHandler = useCallback(() => changeFilter("active", id),[])
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", id), [])


    let tasksForTodolist = tasks

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const onClickHandler =  useCallback((taskID: string) => { removeTask(taskID, id)},[id])
    const onChangeHandler =  useCallback((taskID: string, status: TaskStatuses) => {
        changeTaskStatus (taskID, status, id)
    },[changeTaskStatus, id] )
    const onTitleChangeHandler = useCallback((taskID: string, title: string) => {
        changeTaskTitle(taskID, title, id);
    },[id])
    return <div>
        <h3> <EditableSpan value={title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    return(
                        <Task
                            key={t.id}
                            task={t}
                            onChangeHandler={onChangeHandler}
                            onClickHandler={onClickHandler}
                            onTitleChangeHandler={onTitleChangeHandler}
                        />
                    )


                    return <div key={t.id} className={t.status === 2 ? "is-done" : ""}>
                        <Checkbox
                            checked={t.status === 2}
                            color="primary"
                            onChange={() => onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={() => onTitleChangeHandler} />
                        <IconButton onClick={() => onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div style={{ paddingTop: "10px"}}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


