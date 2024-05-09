import { IssueSchema } from "@/app/validateSchema";
import prisma from "@/prisma/client";
import { NextRequest , NextResponse} from "next/server"

export const PATCH = async(request : NextRequest, {params}: {params:{id:string}}) =>{

    //get all the request from frontend
    const body = await request.json();

    //validate the request
    const validation = IssueSchema.safeParse(body);

    if(!validation.success){
        return NextResponse.json(validation.error.format(), {status : 400});
    }

    const issue = await prisma.issue.findUnique({
        where:{
            id: parseInt(params.id)
        }
    })

    if(!issue){
        return NextResponse.json({error : 'issue not found'}, {status : 404})
    }

    const updateIssue  = await prisma.issue.update({
        where: {
            id: issue.id
        },
        data:{
            title : body.title,
            description : body.description
        }
    })

    return NextResponse.json(updateIssue, {status : 200})

}