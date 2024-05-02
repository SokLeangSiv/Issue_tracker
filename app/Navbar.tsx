'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai"
import { usePathname } from 'next/navigation'
import classnames from 'classnames';

const Navbar = () => {

  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' }
  ]

  return (
    <nav className="flex space-x-4 p-5 border-b-2 border-b-slate-500 mb-7">
      <Link href="/"><AiFillBug /></Link>
      <ul className='flex space-x-8'>
        {links.map((link) => {
          return <li key={link.href}><Link href={link.href} className={classnames({
            'text-slate-900' : currentPath === link.href,
            'text-slate-500' : currentPath !== link.href,
            'hover:text-slate-900' : true
          })}>{link.label}</Link></li>
        })}
      </ul>
    </nav>
  )
}

export default Navbar