import {z} from 'zod';

export const CreateIssueSchema = z.object({
    title : z.string().min(1,'title is required').max(100),
    description : z.string().min(1),
})
