import {z} from 'zod';

export const IssueSchema = z.object({
    title : z.string().min(1,'title is required').max(100),
    description : z.string().min(1),
})

export const PatchSchema = z.object({
    title : z.string().min(1,'title is required').max(100).optional(),
    description : z.string().max(10000).min(1).optional(),
    assignToUserId : z.string().min(1, "assignToUserId is required").max(255).optional().nullable(),
})
