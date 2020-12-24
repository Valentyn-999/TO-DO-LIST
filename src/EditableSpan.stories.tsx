import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { EditableSpan, EditableSpanPropsType } from './EditableSpan';
import {action} from "@storybook/addon-actions";
import {AddItemForm} from "./AddItemForm";

export default {
    title: 'todoLists/EditableSpan',
        component: EditableSpan,
        argTypes: {
        onChange: {
            description: 'EditableSpan clicked',
        },
        value: {
            defaultValue: 'defaultValue'
        }
    },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;


export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    onChange: action('EditableSpanExample clicked')
};

