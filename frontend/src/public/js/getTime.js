const getTime = (timestamp) => {
  
    const date = timestamp ? new Date(timestamp * 1000) : new Date(Date.now()); // Convert seconds to milliseconds
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
}

console.log();

export default getTime;