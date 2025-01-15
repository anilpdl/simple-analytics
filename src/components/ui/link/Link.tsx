'use client'

import { AppAnalytics } from "@/lib/analytics"
import NavLink from 'next/link'
import { usePathname } from "next/navigation"

const Link = (props: any) => {
    const path = usePathname();

    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (path !== props.href) {
            AppAnalytics.trackNavigation({ path: path, href: props.href });
        }

        props.onClick?.(e);
    }

    return (
        <NavLink {...props} onClick={onClick} />
    )
}

export default Link;