"use client"

import { usePathname } from 'next/navigation';

import { AppAnalytics } from '@/lib/analytics';

const Button = (props: any) => {
    const pathname = usePathname();
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        //@ts-expect-error Property 'innerText' does not exist on the event target
        AppAnalytics.trackButtonClick({ path: pathname, title: e.target.innerText });
        props.onClick?.(e);
    }

    return (
        <button {...props} onClick={onClick} />
    )
}

export default Button