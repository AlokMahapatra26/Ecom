import { WEBSITE_HOME } from '@/routes/WebsiteRoute'
import Link from 'next/link'
import React from 'react'

type BreadcrumbLink = {
  label: string
  href?: string
}

type WebsiteBreadcrumbProps = {
  title: string
  links: BreadcrumbLink[]
}

const WebsiteBreadcrumb: React.FC<WebsiteBreadcrumbProps> = ({ title, links }) => {
  return (
    <div className="py-10 flex justify-center items-center bg-accent">
      <div>
        <h1 className="text-2xl font-semibold mb-2 text-center">{title}</h1>
        <ul className="flex gap-2 justify-center">
          <li>
            <Link href={WEBSITE_HOME}>Home</Link>
          </li>
          {links.map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="me-1">/</span>
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default WebsiteBreadcrumb
