import React, { useState, useEffect } from "react";
import axios from "axios";
// import Images from "./components/Images";
import "./App.css";
import { saveAs } from "file-saver";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
// import { ReactDOM } from "react";
function App() {
  const [photo, setPhoto] = useState("Lion");
  // const [photo1, setPhoto1] = useState("Lion2");
  const [images, setImages] = useState([]);
  const clientId =
    "SUSMi5XfkX8WP-82y1I-oy2_GX9h-V7DMteJgfA128g&per_page=30&page=2";

  const downloadImage = (image_url, name) => {
    saveAs(image_url, name); // Put your image url here.
  };

  const handlesubmit = async (e) => {
    const url = `https://api.unsplash.com/search/photos?client_id=${clientId}&query=${photo}&per_page=40`;
    // const url="https://api.unsplash.com/photos/?client_id=SUSMi5XfkX8WP-82y1I-oy2_GX9h-V7DMteJgfA128g&per_page=30&page=2"
    const res = await axios.get(url);
    console.log(res);
    setImages(res.data.results);
  };

  useEffect(() => {
   handlesubmit();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="Container">
      <div class="heading">
        <h3>
          Photo <span>Gallery</span>
        </h3>
      </div>

      <form>
        <input
          value={photo}
          onChange={(e) => {
            setPhoto(e.target.value);
            handlesubmit(e);
          }}
          type="text"
          name="photo"
          placeholder="Search"
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            setPhoto(e.target.value);
            handlesubmit(e);
          }}
        >
          Search
        </button>
      </form>

      
      <div className="photos">
        {images !== undefined &&
          images.map((image) => {
            return (
              <div className="image-container">
                <img
                  className="m-1"
                  key={image.id}
                  alt="error showing"
                  src={image.urls.small}
                  onClick={() => openInNewTab(image.urls.full)}
                />
                <BsFillArrowDownSquareFill
                  onClick={() => {
                    downloadImage(image.urls.full, image.id);
                  }}
                  className="downloadBtn"
                />
              </div>
            );
          })}
      </div>
      <footer>
        <h5>
          Author: Yogesh Chand Upadhyay
          </h5>
          <a href="mailto:yogeshchandupadhyay2002@gmail.com">yogeshchandupadhyay2002@gmail.com</a>
       
      </footer>
    </div>
  );
}

export default App;
