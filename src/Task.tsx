import React, { ChangeEvent } from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    //taskID
    //todoListID
    task: TaskType
    onChangeHandler: (taskID: string, isDone: boolean) => void
    onTitleChangeHandler: (taskID: string, title: string) => void
    onClickHandler: (taskID: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo( ({task, onChangeHandler, onTitleChangeHandler, onClickHandler}   ) => {



    return <div key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={(e: ChangeEvent<HTMLInputElement>,) => onChangeHandler(task.id, e.currentTarget.checked)}
        />

        <EditableSpan value={task.title} onChange={() => onTitleChangeHandler(task.id, task.title)} />
        <IconButton onClick={() => onClickHandler(task.id)}>
            <Delete />
        </IconButton>
    </div>
})