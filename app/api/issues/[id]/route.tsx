import authOption from "@/app/auth/authOption";
import { IssueSchema } from "@/app/validateSchema";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest , NextResponse} from "next/server"

export const PATCH = async(request : NextRequest, {params}: {params:{id:string}}) =>{


    const session = await getServerSession(authOption)

    if(!session)
    {
        return NextResponse.json({error : "Unauthorized"}, {status : 401});
    }

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

export const DELETE = async(request : NextRequest, {params}: {params:{id:string}}) =>{


    const session = await getServerSession(authOption)

    if(!session)
    {
        return NextResponse.json({error : "Unauthorized"}, {status : 401});
    }
    
    const issue = await prisma.issue.findUnique({
        where:{
            id: parseInt(params.id)
        }
    })

    delay(2000);

    if(!issue){
        return NextResponse.json({error : 'issue not found'}, {status : 404})
    }

    await prisma.issue.delete({
        where:{
            id: issue.id
        }
    })

    return NextResponse.json({})
}