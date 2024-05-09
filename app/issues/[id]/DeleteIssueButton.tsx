"use client"
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

    const router = useRouter();

    const [error, setError] = useState(false)

    const handleDelete = async () => {
        try {

            await axios.delete('/api/issues/' + issueId);
            router.push('/issues');
            router.refresh();
        } catch (error) {
            setError(true)
        }
    }

    return (

        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red">Delete</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Confrim Delete ?</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure? you can not undone it back
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant="solid" color="red" onClick={handleDelete}>
                                Delete
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>

            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>
                        Error
                    </AlertDialog.Title>

                    <AlertDialog.Description>
                        This could not be deleted
                    </AlertDialog.Description>

                    <Button color='red' variant='soft' onClick={() => setError(false)}>Ok</Button>
                </AlertDialog.Content>

            </AlertDialog.Root >

        </>

    )
}

export default DeleteIssueButton