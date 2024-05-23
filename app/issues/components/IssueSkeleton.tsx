import { Box } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/components'

const IssueSkeleton = () => {
  return (
    <Box className='max-w-xl'>  {/** Box is a div with some extra styles */}
      <Skeleton height='2rem' />
      <Skeleton height='20rem'/>
    </Box>
  )
}

export default IssueSkeleton