import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';

import {Task, TaskPropsType} from './Task';
import {action} from "@storybook/addon-actions";
import {TaskpPiorities, TaskStatuses} from "./API/todolistAPI";
import {v1} from "uuid";

export default {
    title: 'Example/Button',
    component: Task
} as Meta;

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

    const changeTaskStatus = action('Change task status clicked')
    const changeTaskTitle= action('Change task title clicked')
    const removeTask = action('Remove task clicked')

const baseArg = {
    changeTaskStatus: changeTaskStatus,
    changeTaskTitle: changeTaskTitle,
    removeTask: removeTask
}

export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    ...baseArg,
    task: {id: '1', status: TaskStatuses.New, title: 'JS', todoListId: v1(),
        description: '', startDate: '', deadline: '', addedDate: '',
        order: 0, priority: TaskpPiorities.Low},
    // todoListID: '1'
};
// export const TaskIsDone = Template.bind({});
// TaskIsDone.args = {
//     ...baseArg,
//     task: {id: '1', isDone: false, title: 'JS'},
//     TodoListID: '1'
// };

