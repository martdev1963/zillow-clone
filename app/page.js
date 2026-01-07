import NavBar from "./components/NavBar"
import SearchBar from "./components/SearchBar"
import Map from "./components/Map"
import Card from "./components/Card"


// function to get the property data vidtime: 34:53 / 1:24:05 
const getProperties = async() => {
    const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT
    const HYGRAPH_API_TOKEN = process.env.HYGRAPH_API_TOKEN
    console.log("HYGRAPH_ENDPOINT:", HYGRAPH_ENDPOINT ? "Set" : "NOT SET")
    console.log("HYGRAPH_API_TOKEN:", HYGRAPH_API_TOKEN ? "Set" : "NOT SET")
    
    if (!HYGRAPH_ENDPOINT) {
        throw new Error("HYGRAPH_ENDPOINT is not set...")
    }
    
    if (!HYGRAPH_API_TOKEN) {
        throw new Error("HYGRAPH_API_TOKEN is not set...")
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
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const json = await response.json()
        console.log("Full API response:", JSON.stringify(json, null, 2))
        
        if (json.errors) {
            console.error("GraphQL errors:", json.errors)
            throw new Error("GraphQL query failed")
        }
        
        return json.data.properties
    } catch (error) {
        console.error("Error fetching properties:", error)
        throw error
    }
}

/* this serves as the index.html template file like in flask */
/*vid_time: 41:41 / 1:24:05 */
const Home = async () => {
    let properties = []
    try {
        properties = await getProperties()
        console.log("Properties received:", properties)
        console.log("Number of properties:", properties?.length)
    } catch (error) {
        console.error("Failed to load properties:", error)
        properties = [] // Set to empty array on error
    }
  return (
    <>
      <NavBar/>
      <SearchBar/>
      <main>
          <article>
            listings
             <Map/>
          </article>
          <article className="listings">
             <h2>Rental listings</h2>
             <div className="card-container">
                <Card/>

             </div>
          </article>


      </main>


    </>
  );
}

export default Home