'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai"
import { usePathname } from 'next/navigation'
import classnames from 'classnames';
import { useSession } from 'next-auth/react'
import { Avatar, Box, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { Skeleton } from '@/components'

const Navbar = () => {




  return (
    <nav className=" p-5 border-b-2 border-b-slate-500 mb-7">

      <Flex justify="between">
        <Flex align="center" gap='3'>
          <Link href="/"><AiFillBug /></Link>
          <Navlink />
        </Flex>

        <AuthStatus />
      </Flex>




    </nav>
  )
}


const AuthStatus = () => {

  const { data: session, status } = useSession();


  if (status === 'loading') return <Skeleton width="3rem"/>;

  if (status === 'unauthenticated') return <Link href='/api/auth/signin'>Log in</Link>

  return (
    <Box>
      {status === 'authenticated' &&

        (<DropdownMenu.Root >
          <DropdownMenu.Trigger>
            <Avatar src={session.user!.image!} fallback="?" size="2" radius='full' className="cursor-pointer" />
          </DropdownMenu.Trigger>

          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size='2'>{session.user!.email}</Text>
            </DropdownMenu.Label>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        )
        // <Link href='/api/auth/signout'>Log out</Link>
      }

    </Box>

  )
}

const Navlink = () => {

  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' }
  ]

  return (
    <ul className='flex space-x-8'>

      {links.map((link) => {
        return <li key={link.href}><Link href={link.href} className={classnames({
          'text-slate-900': currentPath === link.href,
          'text-slate-500': currentPath !== link.href,
          'hover:text-slate-900': true
        })}>{link.label}</Link></li>
      })}
    </ul>
  )
}

export default Navbar