// 'use client' directive tells Next.js this component should only run on the client side
// This is required for Leaflet maps because they use browser-only APIs (like window, document)
// Without this, Next.js would try to render the map on the server, causing errors
'use client'

// Import useMemo hook from React
// useMemo is used to memoize (cache) expensive calculations so they only run when dependencies change
// This prevents unnecessary recalculations on every render, improving performance and preventing memory waste
import { useMemo } from 'react'
// Import Leaflet React components for building the map
// MapContainer: The main map wrapper component
// TileLayer: Displays the map tiles (the actual map imagery)
// Marker: Places markers on the map for each property location
// Popup: Shows information when you click on a marker
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// Import Leaflet's CSS styles - required for the map to display correctly
import 'leaflet/dist/leaflet.css'
// Import Leaflet library - the core mapping library
import L from 'leaflet'

// Fix for default marker icons in Next.js
// This code runs once when the module loads (not on every component render)
// The check ensures this only runs in the browser (not during server-side rendering)
if (typeof window !== 'undefined') {
    // Delete the default icon URL getter - this is needed because Next.js has issues with Leaflet's default icon paths
    // Leaflet tries to load icons from relative paths that don't work in Next.js's build system
    delete L.Icon.Default.prototype._getIconUrl
    
    // Override Leaflet's default icon configuration with CDN URLs
    // This ensures the marker icons load correctly in Next.js
    // mergeOptions combines our custom settings with Leaflet's defaults
    L.Icon.Default.mergeOptions({
        // High-resolution icon for retina displays (2x pixel density)
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        // Standard resolution icon for normal displays
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        // Shadow image that appears below the marker for depth effect
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })
}

// Map component that displays an interactive map with property markers
// Receives properties array as a prop - each property should have location data
const Map = ({ properties = [] }) => {
    // Default center coordinates for the map (Miami, FL)
    // Used when there are no properties or properties without valid locations
    // Format: [latitude, longitude]
    const defaultCenter = [25.7617, -80.1918] // Miami, FL
    
    // Default zoom level for the map
    // Higher numbers = more zoomed in (e.g., 10 = city level, 15 = street level)
    const defaultZoom = 10

    // Calculate the center point of the map based on property locations
    // useMemo prevents this calculation from running on every render
    // This is a performance optimization that prevents memory leaks from unnecessary recalculations
    // The calculation only runs when the 'properties' array changes
    const center = useMemo(() => {
        // Check if we have any properties to calculate center from
        if (properties.length > 0) {
            // Filter out properties that don't have valid location data
            // This prevents errors from trying to calculate with undefined/null coordinates
            const validProperties = properties.filter(p => p.location?.latitude && p.location?.longitude)
            
            // If we have valid properties with locations, calculate the center
            if (validProperties.length > 0) {
                // Calculate average latitude: sum all latitudes, divide by count
                // This gives us the geographic center point of all properties
                const avgLat = validProperties.reduce((sum, p) => sum + p.location.latitude, 0) / validProperties.length
                
                // Calculate average longitude: sum all longitudes, divide by count
                const avgLng = validProperties.reduce((sum, p) => sum + p.location.longitude, 0) / validProperties.length
                
                // Return the center point as [latitude, longitude] array
                return [avgLat, avgLng]
            }
        }
        // If no valid properties, return the default center (Miami)
        return defaultCenter
    }, [properties]) // Dependency array: only recalculate when 'properties' changes
    // This dependency array is crucial - it tells React when to recalculate
    // Without it, useMemo wouldn't know when to update, causing stale data or unnecessary recalculations

    // Return the JSX that renders the map
    return (
        // Outer div container for the map
        // style prop sets inline styles for the container
        <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
            {/* MapContainer is the main Leaflet map component */}
            {/* It creates and manages the map instance */}
            {/* React Leaflet automatically handles cleanup when the component unmounts */}
            {/* This prevents memory leaks - the map is properly destroyed when removed from DOM */}
            <MapContainer
                // center: Where the map should be centered when it first loads
                // Uses the calculated center from properties, or default if no properties
                center={center}
                // zoom: Initial zoom level (how zoomed in/out the map is)
                zoom={defaultZoom}
                // style: Inline CSS to make the map fill its container
                style={{ height: '100%', width: '100%' }}
                // scrollWheelZoom: Allows users to zoom with mouse wheel
                scrollWheelZoom={true}
            >
                {/* TileLayer displays the actual map imagery (roads, buildings, etc.) */}
                {/* Uses OpenStreetMap tiles - free, no API key required */}
                <TileLayer
                    // attribution: Required credit text for OpenStreetMap
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    // url: Template for tile server URLs
                    // {s} = subdomain, {z} = zoom level, {x}/{y} = tile coordinates
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Map over the properties array to create a marker for each property */}
                {/* Each property gets its own Marker component */}
                {properties.map((property) => {
                    // Skip properties that don't have valid location data
                    // This prevents errors and broken markers on the map
                    if (!property.location?.latitude || !property.location?.longitude) {
                        // Return null - React ignores null in arrays, so nothing renders
                        return null
                    }
                    
                    // Return a Marker component for this property
                    return (
                        // Marker component places a pin on the map at the property location
                        // key prop is required by React for list items
                        // It helps React efficiently update the DOM when the list changes
                        // Using property.id ensures each marker has a unique, stable key
                        <Marker
                            key={property.id}
                            // position: Where to place the marker on the map
                            // Format: [latitude, longitude]
                            // Uses the property's location coordinates
                            position={[property.location.latitude, property.location.longitude]}
                        >
                            {/* Popup component shows information when marker is clicked */}
                            {/* Automatically handles open/close state - no manual event listeners needed */}
                            {/* This prevents memory leaks from unremoved event listeners */}
                            <Popup>
                                {/* Content displayed in the popup when marker is clicked */}
                                <div>
                                    {/* Property name in bold */}
                                    <strong>{property.name}</strong>
                                    {/* Line break */}
                                    <br />
                                    {/* Rental price per month */}
                                    ${property.rentalPrice} / month
                                    {/* Line break */}
                                    <br />
                                    {/* Number of bedrooms */}
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

// Export the Map component as the default export
// This allows other files to import it with: import Map from './Map'
export default Map
