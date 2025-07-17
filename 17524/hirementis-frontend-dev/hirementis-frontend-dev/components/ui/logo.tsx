import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Logo = ({ className}: {className?: string}) => {
  return (
    <Link href="/" className="flex items-center">
      <Image width={50} height={50} src="/logo.png" alt="Logo" className={`brightness-105 ${className}`} />
    </Link>
  )
}

export default Logo