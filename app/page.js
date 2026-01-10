// Import React components that will be used in this page
// NavBar: The navigation bar component at the top of the page
import NavBar from "./components/NavBar"
// SearchBar: The search input component below the nav bar
import SearchBar from "./components/SearchBar"
// Map: The interactive map component (wrapped to avoid SSR issues)
import Map from "./components/MapWrapper"
// Card: The property card component that displays individual property listings
import Card from "./components/Card"


// This is an async function that fetches property data from Hygraph (GraphQL CMS)
// It's defined outside the component so it can be called during server-side rendering
// The function returns a Promise that resolves to an array of property objects
const getProperties = async() => {
    // Get environment variables from .env.local file
    // HYGRAPH_ENDPOINT: The URL of your Hygraph GraphQL API endpoint
    const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT
    // HYGRAPH_API_TOKEN: The authentication token to access your Hygraph API
    const HYGRAPH_API_TOKEN = process.env.HYGRAPH_API_TOKEN
    
    // Log to console whether the environment variables are set (for debugging)
    // This helps identify if .env.local is configured correctly
    console.log("HYGRAPH_ENDPOINT:", HYGRAPH_ENDPOINT ? "Set" : "NOT SET")
    console.log("HYGRAPH_API_TOKEN:", HYGRAPH_API_TOKEN ? "Set" : "NOT SET")
    
    // Check if HYGRAPH_ENDPOINT is missing - if so, throw an error to stop execution
    // This prevents the app from trying to make API calls without a valid endpoint
    if (!HYGRAPH_ENDPOINT) {
        throw new Error("HYGRAPH_ENDPOINT is not set...")
    }
    
    // Check if HYGRAPH_API_TOKEN is missing - if so, throw an error to stop execution
    // Authentication is required to access the Hygraph API
    if (!HYGRAPH_API_TOKEN) {
        throw new Error("HYGRAPH_API_TOKEN is not set...")
    }
    
    // Wrap the API call in a try-catch block to handle any errors gracefully
    try {
        // Use the native fetch API to make an HTTP POST request to Hygraph
        // POST is required for GraphQL queries (even though we're just reading data)
        const response = await fetch(HYGRAPH_ENDPOINT, {
            // Specify the HTTP method as POST
            method: "POST",
            // Set request headers to tell the server what type of data we're sending
            headers: {
                // Content-Type tells the server we're sending JSON data
                "Content-Type": "application/json",
                // Authorization header includes the API token for authentication
                // The Bearer prefix is a standard way to send authentication tokens
                "Authorization": `Bearer ${HYGRAPH_API_TOKEN}`
            },
            // Convert the request body to a JSON string
            // GraphQL queries are sent as JSON in the body
            body: JSON.stringify({
                // The GraphQL query string - this defines what data we want to fetch
                query: `
                query PropertiesQuery {
                  properties {
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
                `
            })
        })
        
        // Parse the JSON response from the API
        // We do this even if the response status is not OK, so we can see error details
        // await pauses execution until the JSON parsing is complete
        const json = await response.json()
        
        // Log the HTTP status code for debugging (200 = success, 400 = bad request, etc.)
        console.log("API Response Status:", response.status)
        // Log the full response body as a formatted JSON string for debugging
        // This helps identify what data (or errors) the API is returning
        console.log("API Response Body:", JSON.stringify(json, null, 2))
        
        // Check if the HTTP response status indicates an error (not 200-299 range)
        // If there's an HTTP error, we want to throw a descriptive error message
        if (!response.ok) {
            // Extract the error message from the response
            // Try to get GraphQL error message first, then generic message, then fallback
            const errorMsg = json.errors?.[0]?.message || json.message || `HTTP ${response.status} error`
            // Log the error to console for debugging
            console.error("Request failed:", errorMsg)
            // Throw an error with details about what went wrong
            // This will be caught by the catch block below
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorMsg}`)
        }
        
        // Check if the GraphQL response contains any errors
        // GraphQL can return data AND errors simultaneously, so we check both
        if (json.errors) {
            // Log all GraphQL errors as a formatted JSON string for debugging
            console.error("GraphQL errors:", JSON.stringify(json.errors, null, 2))
            // Combine all error messages into a single string
            // map() creates an array of error messages, join() combines them with commas
            const errorDetails = json.errors.map(e => e.message).join(', ')
            // Throw an error with all the GraphQL error details
            throw new Error(`GraphQL query failed: ${errorDetails}`)
        }
        
        // Check if the response has a data property
        // GraphQL responses always have a 'data' property when successful
        if (!json.data) {
            // Log the full response if there's no data (for debugging)
            console.error("No data in response:", JSON.stringify(json, null, 2))
            // Throw an error indicating no data was returned
            throw new Error("No data returned from GraphQL query")
        }
        
        // Extract the properties array from the GraphQL response
        // json.data.properties contains the array of property objects
        // If properties is undefined or null, use an empty array as fallback
        const properties = json.data.properties || []
        // Log how many properties were successfully fetched
        console.log("Properties fetched successfully:", properties.length, "properties")
        // If we have properties, log their names and slugs for debugging
        if (properties.length > 0) {
            // map() creates a new array with just the name property from each property object
            console.log("Property names:", properties.map(p => p.name))
            // map() creates a new array with just the slug property from each property object
            console.log("Property slugs:", properties.map(p => p.slug))
        } else {
            // Warn if no properties were found - this helps identify if properties are published in Hygraph
            console.warn("⚠️ No properties found! Make sure properties are PUBLISHED in Hygraph (not just saved as drafts)")
        }
        // Return the array of properties so it can be used by the component
        return properties
    } catch (error) {
        // If any error occurs in the try block, it's caught here
        // Log the error to console for debugging
        console.error("Error fetching properties:", error)
        // Re-throw the error so the calling code (Home component) can handle it
        // This allows the component to show an error state or fallback UI
        throw error
    }
}

/* This is the main Home component - it serves as the index page of the app */
/* In Next.js App Router, this file (page.js) automatically becomes the route for "/" */
/* The component is async because it needs to fetch data before rendering */
const Home = async () => {
    // Initialize an empty array to hold properties
    // This will be populated with data from the API, or remain empty if there's an error
    let properties = []
    
    // Try to fetch properties from the API
    try {
        // Call the getProperties function and wait for it to complete
        // await pauses execution until the Promise resolves
        // The result is stored in the properties variable
        properties = await getProperties()
        // Log the properties array to console for debugging
        console.log("Properties received:", properties)
        // Log the count of properties for debugging
        // The ?. is optional chaining - it safely accesses length even if properties is null/undefined
        console.log("Number of properties:", properties?.length)
    } catch (error) {
        // If getProperties() throws an error, catch it here
        // Log the error to console for debugging
        console.error("Failed to load properties:", error)
        // Set properties to an empty array so the app doesn't crash
        // The UI will show "No properties found" instead of breaking
        properties = [] // Set to empty array on error
    }
    
    // Return the JSX (JavaScript XML) that defines the page structure
    // React components return JSX which gets converted to HTML
    return (
        // Fragment (<> </>) - allows returning multiple elements without a wrapper div
        // Fragments don't add extra DOM elements, keeping the HTML clean
        <>
            {/* Render the NavBar component at the top of the page */}
            <NavBar/>
            {/* Render the SearchBar component below the nav bar */}
            <SearchBar/>
            {/* Main content area of the page */}
            <main>
                {/* Left article - contains the map */}
                <article>
                    {/* Render the Map component and pass properties as a prop */}
                    {/* The properties prop allows the map to show markers for each property */}
                    <Map properties={properties} />
                </article>
                {/* Right article - contains the property listings */}
                {/* className="listings" applies CSS styling to this article */}
                <article className="listings">
                    {/* Heading for the listings section */}
                    <h2>Rental listings</h2>
                    {/* Container div for the property cards */}
                    {/* className="card-container" applies CSS styling for flexbox layout */}
                    <div className="card-container">
                        {/* Conditional rendering: check if we have any properties */}
                        {/* If properties array has items, render them; otherwise show a message */}
                        {properties.length > 0 ? (
                            // If we have properties, use map() to create a Card component for each one
                            // map() iterates over the properties array and returns a new array of React elements
                            properties.map(property => (
                                // Card component displays a single property
                                // key prop is required by React for list items - helps React track which items changed
                                // Each property needs a unique key (we use the id from Hygraph)
                                <Card
                                    key={property.id}
                                    // Pass property data as props to the Card component
                                    // propertyName: The name/title of the property
                                    propertyName={property.name}
                                    // slug: URL-friendly identifier used for routing to detail page
                                    slug={property.slug}
                                    // rentalPrice: Monthly rental price in dollars
                                    rentalPrice={property.rentalPrice}
                                    // beds: Number of bedrooms
                                    beds={property.beds}
                                    // image: First image from the images array (if available)
                                    // ?. is optional chaining - safely accesses [0] even if images is null/undefined
                                    image={property.images?.[0]}
                                />
                            ))
                        ) : (
                            // If no properties, show a message to the user
                            <p>No properties found.</p>
                        )}
                    </div>
                </article>
            </main>
        </>
    )
}

// Export the Home component as the default export
// This makes it the component that Next.js will render for the "/" route
export default Home
