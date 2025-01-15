"use client"
import { AppAnalytics } from '@/lib/analytics'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect } from 'react'

const PageTracker = () => {
    const pathname = usePathname()
    const trackPageView = useCallback(() => {
        AppAnalytics.trackPageView({ path: pathname })
    }, [pathname])

    useEffect(() => {
        trackPageView()
    }, [trackPageView])

    return null;
}

export default PageTracker