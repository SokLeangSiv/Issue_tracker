'use client'
import React from 'react'
import { TextField, Button } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type FormProp = {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter();
    const { register, handleSubmit, control } = useForm<FormProp>();

    return (
        <form className='max-w-xl space-y-4'
            onSubmit={handleSubmit(async (data) => {
                await axios.post('/api/issues', data)
                router.push('/issues')
            }
            )}>

            <TextField.Root placeholder='Title' {...register('title')} />
            <Controller
                name='description'
                control={control}
                render={({ field }) => (
                    <SimpleMDE {...field} />
                )}
            />
            <Button>Submit</Button>
        </form>
    )
}

export default NewIssuePage