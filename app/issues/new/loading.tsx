import { Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingNewIssuePage = () => {
  return (
    <Box className='max-w-xl'>  {/** Box is a div with some extra styles */}
      <Skeleton count={2} />
      <Skeleton count={8}/>
    </Box>
  )
}

export default LoadingNewIssuePage