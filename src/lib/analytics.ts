export class AppAnalytics {
    public static async trackEvent(type: string, path: string, details?: string) {
        try {
            await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type,
                    path,
                    details,
                }),
            });
        } catch (error) {
            console.error('Failed to track event:', error);
        }
    }

    public static async trackPageView({ path }: { path: string }) {
        await this.trackEvent('PageView', path, `${path.split('/').pop()} page viewed`)
    }

    public static async trackButtonClick({ path, title }: { path: string, title: string }) {
        await this.trackEvent('Click', path, `${title} button clicked`)
    }

    public static async trackNavigation({ path, href }: { path: string, href: string }) {
        await this.trackEvent('Navigation', path, `Navigation to ${href}`)
    }

    public static async getEvents() {
        try {
            const response = await fetch('/api/events');
            const events = await response.json();

            return events;
        } catch (error) {
            console.error('Failed to get events:', error);
            return [];
        }
    }

    public static async getChartData() {
        try {
            const response = await fetch('/api/events/chart');
            const chartData = await response.json();

            return chartData;
        } catch (error) {
            console.error('Failed to get chart data:', error);
            return [];
        }
    }
}