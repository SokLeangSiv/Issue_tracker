"use client"

import { Card } from '@radix-ui/themes'
import React from 'react'
import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar} from 'recharts'

interface Props {
    open: number,
    Inprogress: number,
    closes: number

}

const IssueChart = ({open, Inprogress, closes}: Props) => {

    const data = [
        {label:'Open', value : open},
        {label:'In Progress ', value : Inprogress},
        {label:'Closes', value : closes},
    ]
  return (
    <Card>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey='label'/>
                <YAxis/>
                <Bar dataKey='value' fill='#8884d8' barSize={60}/>
            </BarChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default IssueChart