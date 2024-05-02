'use client'
import React from 'react'
import { TextField , Button } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
    return (
        <div className='max-w-xl space-y-4'>
          
                <TextField.Root placeholder='Title' />
                <SimpleMDE placeholder='Descrption' />
                <Button>Submit</Button>
        </div>
    )
}

export default NewIssuePage