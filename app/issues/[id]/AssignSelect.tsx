"use client"
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AssignSelect = () => {

    const [users,setUser] = useState<User[]>([]);

    useEffect(()=>{

     

        const fetchUser = async () => {
            const { data } = await axios.get<User[]>('/api/users');
            setUser(data);
        }

        fetchUser();
     

    }, [])

    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...' />

            <Select.Content>

                <Select.Group>
                    <Select.Label>Suggestion</Select.Label>
                    {users.map((user)=>{
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