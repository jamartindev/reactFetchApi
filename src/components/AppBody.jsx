import React, { useEffect, useState } from "react"; // Importing React, useEffect, and useState from React
import "../styles/Body.css"; // Importing the Body.css file for styling

// CharacterImage component
function CharacterImage({ imageUrl, name }) {
  const imageUrlWithoutRevision = imageUrl.slice(
    0,
    imageUrl.indexOf("/revision")
  );
  return <img src={imageUrlWithoutRevision} alt={`${name} Image`} />;
}

// CharacterInfo component
function CharacterInfo({ character }) {
  return (
    <div key={character.id}>
      <h4>Name:</h4> <p>{character.name}</p>
      <h4>Age:</h4> <p>{character.age[0]}</p>
      <h4>Grade:</h4> <p>{character.grade}</p>
      <h4>Status:</h4> <p>{character.status}</p>
    </div>
  );
}

// CharacterDescription component - Formats text fetched from a json file
function CharacterDescription({ character }) {
  const formatContent = (content) => {
    const words = content.split(".");
   const formatted = [];
    for (let i = 0; i < words.length; i+=3) {
      let word = words.slice(i, i + 3).join(". ");
      formatted.push(word);
    }
    
    return formatted;
  };


  return (
    <div>
      <h4>Description:</h4>{" "}
      {character.appearance != null ? (
          formatContent(character.abilities).map((contentFormatted, index) => (
            <p key={index}>{contentFormatted}</p>
          ))
      ) : (
        ""
      )}
      <h4>Abilities:</h4>{" "}
      {character.abilities != null ? (
          formatContent(character.abilities).map((contentFormatted, index) => (
            <p key={index}>{contentFormatted}</p>
          ))
      ) : (
        ""
      )}
    </div>
  );
}

// AppBody component
export default function AppBody() {
  const [chars, setChars] = useState([]); // Using the useState hook to create a state variable 'chars' with an empty array as initial value
  const [slide, setSlide] = useState(0); // Using the useState hook to create a state variable 'slide' with initial value 0

  const slideNext = () => {
    // Function to go to the next slide
    if (slide < chars.length) {
      // Checking if there are more slides to go to
      setSlide(slide + 1); // Updating the slide state to go to the next slide
    }
  };

  const slidePrev = () => {
    // Function to go to the previous slide
    if (slide > 0) {
      // Checking if there are previous slides to go to
      setSlide(slide - 1); // Updating the slide state to go to the previous slide
    }
  };

  useEffect(() => {
    // Using the useEffect hook to fetch character data when the slide changes
    console.log("Component mounted");
    async function fetchChars() {
      try {
        const response = await fetch("./fetchData/characters.json");
        if (response.ok) {
          console.log("Promise resolved and HTTP status is ok");
          const data = await response.json();
          setChars(data);
        } else {
          if (response.status === 404) throw new Error("404, Not found");
          if (response.status === 500)
            throw new Error("500, internal server error");
          throw new Error(response.status);
        }
      } catch (error) {
        console.error("Fetch", error);
      }
      return chars;
    }
    fetchChars();
  }, []);
  return (
    <div className="container">
      <div className="item">
        <button className="prev-button" onClick={slidePrev}>
          <i className="fa fa-chevron-left"></i>
        </button>
      </div>
      <div className="item">
        {chars.length > 0 && (
          <CharacterImage
            imageUrl={chars[slide].image_url}
            name={chars[slide].name}
          />
        )}
      </div>
      <div className="item">
        {chars.length > 0 && <CharacterInfo character={chars[slide]} />}
        {chars.length > 0 && <CharacterDescription character={chars[slide]} />}
      </div>
      <div className="item">
        <button className="next-button" onClick={slideNext}>
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
