'use client'

import dynamic from 'next/dynamic'

// Dynamically import Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import('./Map'), {
    ssr: false,
    loading: () => <div style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>Loading map...</div>
})

export default Map

