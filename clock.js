function updateClocks() {
    const now = new Date();

    // Define timezones
    const timezones = [
        { id: 'ny-time', timezone: 'America/New_York', name: 'New York' },
        { id: 'london-time', timezone: 'Europe/London', name: 'London' },
        { id: 'paris-time', timezone: 'Europe/Paris', name: 'Paris' },
        { id: 'dubai-time', timezone: 'Asia/Dubai', name: 'Dubai' },
        { id: 'india-time', timezone: 'Asia/Kolkata', name: 'India' },
        { id: 'singapore-time', timezone: 'Asia/Singapore', name: 'Singapore' },
        { id: 'tokyo-time', timezone: 'Asia/Tokyo', name: 'Tokyo' },
        { id: 'sydney-time', timezone: 'Australia/Sydney', name: 'Sydney' },
        { id: 'la-time', timezone: 'America/Los_Angeles', name: 'Los Angeles' },
        { id: 'toronto-time', timezone: 'America/Toronto', name: 'Toronto' },
        { id: 'sao-paulo-time', timezone: 'America/Sao_Paulo', name: 'São Paulo' },
        { id: 'hong-kong-time', timezone: 'Asia/Hong_Kong', name: 'Hong Kong' }
    ];

    // Update each timezone
    timezones.forEach(tz => {
        const timeString = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: tz.timezone
        }).format(now);

        const element = document.getElementById(tz.id);
        if (element) {
            element.textContent = timeString;
        }
    });

    // Update local time
    const localTimeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const localElement = document.getElementById('local-time');
    if (localElement) {
        localElement.textContent = localTimeString;
    }

    // Get local timezone
    const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezoneElement = document.getElementById('local-timezone');
    if (timezoneElement) {
        timezoneElement.textContent = `Your Timezone: ${timeZoneName}`;
    }
}

// Update clocks immediately on load
updateClocks();

// Update clocks every second
setInterval(updateClocks, 1000);