const ZillowLogo = () => {
  return (
    <svg 
      width="120" 
      height="32" 
      viewBox="0 0 120 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* House Icon */}
      <path 
        d="M8 20L16 12L24 20V28H18V22H14V28H8V20Z" 
        fill="#006AFF"
      />
      <path 
        d="M16 8L6 18V30H12V24H20V30H26V18L16 8Z" 
        fill="#006AFF"
      />
      
      {/* Zillow Text */}
      <text 
        x="32" 
        y="22" 
        fontFamily="Arial, sans-serif" 
        fontSize="20" 
        fontWeight="bold" 
        fill="#006AFF"
      >
        Zillow
      </text>
    </svg>
  )
}

export default ZillowLogo

