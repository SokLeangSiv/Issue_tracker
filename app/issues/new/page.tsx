'use client'
import React from 'react'
import { TextField, Button, Callout,Text } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CreateIssueSchema } from '@/app/validateSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { set, z } from 'zod';
import Spinner from '@/components/Spinner';

// we use this to infer the type of the form we dont have to declare it again for example 
// type FormProp = {
//     title: string;
//     description: string;
// }

//we use this is save our time and make our code more maintainable
type FormProp = z.infer<typeof CreateIssueSchema>; 


const NewIssuePage = () => {
    const router = useRouter();
    const [error, setError] = useState('')
    const { register, handleSubmit, control, formState  : {errors} } = useForm<FormProp>({
        resolver : zodResolver(CreateIssueSchema)
    });
    
    const [isSubmitting,setSubmitting ]=useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
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

                <TextField.Root placeholder='Title' {...register('title')} />

                {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}

                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE {...field} />
                    )}
                />
                {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}

                <Button disabled={isSubmitting}>Submit new Issue {isSubmitting && <Spinner/>} </Button>
            </form>
        </div>
    )
}

export default NewIssuePage