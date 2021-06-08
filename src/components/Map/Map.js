import React, { useState, useEffect } from "react";

const Map = () => {
  const [map, setMap] = useState();

  useEffect(() => {
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBQ4DKD-8BrKCXk5JwSrCZVVtYxQL0hHyo&q=Space+Needle,Seattle+WA"`;
   
    setMap(mapUrl);
  }, []);

  return (
    <div>
      <iframe
        title="google-Map"
        width="800rem"
        height="600"
        style={{ border: "0" }}
        loading="lazy"
        allowFullScreen
        src={map}
         // map will not appear in the page cause of payment method refused
      ></iframe>
    </div>
  );
};

export default Map;