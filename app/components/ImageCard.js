import Image from 'next/image'

const ImageCard = ({url, fileName, width, height}) => {
    if (!url) {
        return (
            <div className="card-image-placeholder">
                No image available
            </div>
        )
    }
    
    return (
        <Image
            className="card-image"
            src={url}
            alt={fileName || 'Property image'}
            width={width}
            height={height}
            priority
        />
    )
}

export default ImageCard
