'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

import React from 'react'

const IssueStatus = () => {

    const issueStatus: { label: string, value?: Status }[] = [
        {
            label: 'All',

        },
        {
            label: 'Open',
            value: "OPEN"
        },
        {
            label: 'In Process',
            value: "IN_PROCESS"
        },
        {
            label: 'CLOSED',
            value: "CLOSED"

        }
    ]

    const router = useRouter()

    const searchParams = useSearchParams();

    return (
        <Select.Root
            defaultValue={searchParams.get('status') || "All"}
            onValueChange={(status) => {

                const params = new URLSearchParams()

                if (status) params.append('status', status)
                if (searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!)


                const query = params.size ? '?' + params.toString() : "";
                router.push('/issues/list' + query)
            }}>
            <Select.Trigger placeholder='All' />
            <Select.Content>

                {issueStatus.map((status) => {
                    return (
                        <Select.Item key={status.label} value={status.value || "All"}>{status.label}</Select.Item>
                    )
                })}

            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatus