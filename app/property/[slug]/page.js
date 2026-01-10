import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import NavBar from '../../components/NavBar'

const getProperty = async (slug) => {
    const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT
    const HYGRAPH_API_TOKEN = process.env.HYGRAPH_API_TOKEN
    
    if (!HYGRAPH_ENDPOINT || !HYGRAPH_API_TOKEN) {
        return null
    }
    
    try {
        const response = await fetch(HYGRAPH_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${HYGRAPH_API_TOKEN}`
            },
            body: JSON.stringify({
                query: `
                query PropertyQuery($slug: String!) {
                  property(where: { slug: $slug }) {
                    beds
                    description
                    images {
                      fileName
                      url
                    }
                    location {
                      latitude
                      longitude
                    }
                    name
                    rentalPrice
                    slug
                    id
                  }
                }
                `,
                variables: { slug }
            })
        })
        
        // Parse JSON even if response is not ok to get error details
        const json = await response.json()
        
        if (!response.ok) {
            console.error("HTTP error in property query:", response.status, JSON.stringify(json, null, 2))
            return null
        }
        
        // Log response for debugging
        if (json.errors) {
            console.error("GraphQL errors in property query:", JSON.stringify(json.errors, null, 2))
            return null
        }
        
        if (!json.data?.property) {
            console.error("No property found in response:", JSON.stringify(json, null, 2))
            return null
        }
        
        return json.data.property
    } catch (error) {
        console.error("Error fetching property:", error)
        return null
    }
}

const PropertyPage = async ({ params }) => {
    // In Next.js 14+, params might be a promise
    const resolvedParams = await params
    const slug = resolvedParams.slug
    
    const property = await getProperty(slug)
    
    if (!property) {
        console.error("Property not found for slug:", slug)
        notFound()
    }
    
    return (
        <>
            <NavBar />
            <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <Link href="/" style={{ color: '#006AFF', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
                    ← Back to listings
                </Link>
                
                <h1>{property.name}</h1>
                
                <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        {property.images && property.images.length > 0 && (
                            <>
                                <div style={{ marginBottom: '20px' }}>
                                    <Image
                                        src={property.images[0].url}
                                        alt={property.images[0].fileName || property.name}
                                        width={600}
                                        height={400}
                                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                        priority
                                    />
                                </div>
                                {property.images.length > 1 && (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                                        {property.images.slice(1).map((image, index) => (
                                            <Image
                                                key={index}
                                                src={image.url}
                                                alt={image.fileName || `${property.name} - Image ${index + 2}`}
                                                width={200}
                                                height={150}
                                                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                            <h2 style={{ marginTop: 0 }}>${property.rentalPrice} / month</h2>
                            <p><strong>{property.beds} Bedrooms</strong></p>
                        </div>
                        
                        {property.description && (
                            <div style={{ marginBottom: '20px' }}>
                                <h3>Description</h3>
                                <p>{property.description}</p>
                            </div>
                        )}
                        
                        {property.location && (
                            <div>
                                <h3>Location</h3>
                                <p>Latitude: {property.location.latitude}</p>
                                <p>Longitude: {property.location.longitude}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PropertyPage
