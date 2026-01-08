import Link from 'next/link'


const Card = ({
    propertyName,
    slug,
    rentalPrice,
    beds,
    image
}) => {

    return (
        <Link href={`/property/${slug}`}>
            <div>{propertyName}</div> 
        </Link>
    )
} 
export default Card 
// vid_time: 46:22 / 01:24:05