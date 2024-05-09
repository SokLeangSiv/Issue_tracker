'use client'

import { Button, Callout, Text, TextField } from '@radix-ui/themes';

import { IssueSchema } from '@/app/validateSchema';
import Spinner from '@/components/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import delay from 'delay';
import "easymde/dist/easymde.min.css";
import SimpleMDE from 'react-simplemde-editor';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Issue } from '@prisma/client';

// we use this to infer the type of the form we dont have to declare it again for example 
// type FormProp = {
//     title: string;
//     description: string;
// }

//we use this is save our time and make our code more maintainable
type IssueFormData = z.infer<typeof IssueSchema>;





const IssueForm = ({ issue }: { issue?: Issue }) => {

    delay(2000)
    const router = useRouter();
    const [error, setError] = useState('')
    const { register, handleSubmit, control, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(IssueSchema)
    });

    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            if (issue) {
                await axios.patch(`/api/issues/${issue.id}`, data)
                router.push('/issues')
                
            }
            else{
                await axios.post('/api/issues', data)
                router.push('/issues')
                router.refresh();
            }
        } catch (err) {
            setSubmitting(false)
            setError('unexpected error occured')
        }
    }
    )

    return (
        <div className='max-w-xl'>
            {error && <Callout.Root>

                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form className=' space-y-4'
                onSubmit={onSubmit}>

                <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')} />

                {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}

                <Controller
                    name='description'
                    defaultValue={issue?.description}
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE {...field} />
                    )}
                />
                {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}

                <Button disabled={isSubmitting}>
                    {issue ? "Update Issue" : "Create new Issue"} {''}
                    {isSubmitting && <Spinner />} </Button>
            </form>
        </div>
    )
}

export default IssueForm 