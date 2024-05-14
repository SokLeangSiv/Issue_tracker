import { Select } from '@radix-ui/themes'
import React from 'react'

const AssignIssue = () => {
    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...' />

            <Select.Content>

                <Select.Group>
                    <Select.Label>Suggestion</Select.Label>
                    <Select.Item value='1'>Siv</Select.Item>
                </Select.Group>

            </Select.Content>

        </Select.Root>
    )
}

export default AssignIssue