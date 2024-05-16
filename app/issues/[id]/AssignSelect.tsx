'use client'
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AssignSelect = () => {

    const {data:users , isLoading,error} = useQuery<User[]>({
        queryKey: ['users'], // query key
        queryFn : () => axios.get('/api/users').then((res)=>res.data), // fetch users
        staleTime: 1000 * 60 , // 1 minute
        retry: 3 // retry 3 times
    })

    if(isLoading) return <div>Loading...</div>
    
    if(error) return <div>Error: {error.message}</div>
   

    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...' />

            <Select.Content>

                <Select.Group>
                    <Select.Label>Suggestion</Select.Label>
                    {users?.map((user)=>{
                        return (
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        )
                    })}
                    
                </Select.Group>

            </Select.Content>

        </Select.Root>
    )
}

export default AssignSelect