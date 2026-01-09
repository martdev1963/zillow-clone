'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icons in Next.js
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const Map = ({ properties = [] }) => {
    // Default center (can be adjusted based on properties)
    const defaultCenter = [25.7617, -80.1918] // Miami, FL
    const defaultZoom = 10

    // Calculate center from properties if available
    const center = properties.length > 0 
        ? [
            properties.reduce((sum, p) => sum + (p.location?.latitude || 0), 0) / properties.length,
            properties.reduce((sum, p) => sum + (p.location?.longitude || 0), 0) / properties.length
          ]
        : defaultCenter

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
            <MapContainer
                center={center}
                zoom={defaultZoom}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {properties.map((property) => {
                    if (!property.location?.latitude || !property.location?.longitude) {
                        return null
                    }
                    return (
                        <Marker
                            key={property.id}
                            position={[property.location.latitude, property.location.longitude]}
                        >
                            <Popup>
                                <div>
                                    <strong>{property.name}</strong>
                                    <br />
                                    ${property.rentalPrice} / month
                                    <br />
                                    {property.beds} Beds
                                </div>
                            </Popup>
                        </Marker>
                    )
                })}
            </MapContainer>
        </div>
    )
}

export default Map
