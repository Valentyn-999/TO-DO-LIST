import React, { ChangeEvent } from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./API/todolistAPI";


export type TaskPropsType = {
    //taskID
    //todoListID
    task: TaskType
    onChangeHandler: (taskID: string, status: TaskStatuses) => void
    onTitleChangeHandler: (taskID: string, title: string) => void
    onClickHandler: (taskID: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo( ({task, onChangeHandler, onTitleChangeHandler, onClickHandler}   ) => {



    return <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox
            checked={task.status === TaskStatuses.Completed}
            color="primary"
            onChange={(e: ChangeEvent<HTMLInputElement>,) => onChangeHandler(task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)}
        />

        <EditableSpan value={task.title} onChange={() => onTitleChangeHandler(task.id, task.title)} />
        <IconButton onClick={() => onClickHandler(task.id)}>
            <Delete />
        </IconButton>
    </div>
})