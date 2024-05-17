'use client'
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AssignSelect = ({ issue }: { issue: Issue }) => {

    const { data: users, isLoading, error } = useQuery<User[]>({
        queryKey: ['users'], // query key
        queryFn: () => axios.get('/api/users').then((res) => res.data), // fetch users
        staleTime: 1000 * 60, // 1 minute
        retry: 3 // retry 3 times
    })

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>Error: {error.message}</div>

    const handleValueChange = async(userId : string) => {
       try {
        await axios.patch(`/api/issues/${issue.id}`, { assignToUserId: userId === 'unassign' ? null : userId })
        toast.success('Assign updated')
       } catch (error) {
            toast.error('Failed to update assign')
       }

      };

    return (
       <>
        <Select.Root onValueChange={handleValueChange} defaultValue={issue.assignToUserId || ''}>
            <Select.Trigger placeholder='Assign ...' />

            <Select.Content>

                <Select.Group>
                    <Select.Label>Suggestion</Select.Label>
                    <Select.Item value="unassign">Unassign</Select.Item>
                    {users?.map((user) => {
                        return (
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        )
                    })}

                </Select.Group>

            </Select.Content>

        </Select.Root>

        <Toaster />
        </>
        
    )
}

export default AssignSelect