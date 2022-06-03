import React, { useState } from "react";
import axios from "axios";
// import Images from "./components/Images";
import "./App.css";
import { saveAs } from 'file-saver'
import {BsFillArrowDownSquareFill} from 'react-icons/bs'
// import { ReactDOM } from "react";
function App() {
  const [photo, setPhoto] = useState("Cat");
  const [images, setImages] = useState([]);
  const clientId= 
    "SUSMi5XfkX8WP-82y1I-oy2_GX9h-V7DMteJgfA128g&per_page=30&page=2";
  
  const downloadImage = (image_url,name) => {
    saveAs(image_url, name) // Put your image url here.
  }
  
  const handlesubmit = async (e) => {

    e.preventDefault();
    const url = `https://api.unsplash.com/search/photos?client_id=${clientId}&query=${photo}&per_page=50`;
    // const url="https://api.unsplash.com/photos/?client_id=SUSMi5XfkX8WP-82y1I-oy2_GX9h-V7DMteJgfA128g&per_page=30&page=2"
    const res = await axios.get(url);
    console.log(res);
    setImages(res.data.results);

    
  };
  

  return (
    <div className="Container">
      <br />
      <form>
        <input
          value={photo}
          onChange={(e) => {
            setPhoto(e.target.value);
          }}
          type="text"
          name="photo"
          placeholder="Search"
        />

        <button onClick={handlesubmit}>
          Search
        </button>
      </form>
     
      <br />
      <div className="photos">
        {images !== undefined &&
          images.map((image) => {
            return (
              <div className="image-container">
                  <img className="m-1" key={image.id} alt="error showing" src={image.urls.small} />
                  <BsFillArrowDownSquareFill onClick={()=>{downloadImage(image.urls.full,image.id)}} className='downloadBtn'/>
                
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
