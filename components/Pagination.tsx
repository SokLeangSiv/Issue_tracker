"use client"

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex,Text } from '@radix-ui/themes';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {

    itemCount : number;
    pageSize : number;
    currentPage : number;
}

const Pagination = ({itemCount,currentPage,pageSize}: Props) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const pageCount = Math.ceil(itemCount/pageSize);
    
    if(pageCount <= 1) return null;




    const Changepage = (page:number) =>{

        const params = new URLSearchParams(searchParams);
        params.set('page',String(page));
        router.push('?' + params.toString());

    }


  return (
    <Flex align="center" gap="3" >
        <Text>Page {currentPage} of {pageCount}</Text>
        <Button color='gray'  disabled={currentPage === 1} onClick={()=> Changepage(1)}>
            <DoubleArrowLeftIcon />
        </Button>
        <Button color='gray'  disabled={currentPage === 1} onClick={()=> Changepage(currentPage - 1)}>
            <ChevronLeftIcon />
        </Button>
        <Button color='gray'  disabled={currentPage === pageCount} onClick={()=> Changepage(currentPage + 1)}>
            <ChevronRightIcon />
        </Button>
        <Button color='gray'  disabled={currentPage === pageCount} onClick={()=> Changepage(pageCount)}>
            <DoubleArrowRightIcon />
        </Button>
    </Flex>
  )
}

export default Pagination