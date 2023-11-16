import { useState } from "react";
import data from "../../data";

function initialIndex() {

    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

    return 0;
}

function Gallery() {
    const [index, setIndex] = useState(initialIndex);
    const slide = data[index];

    function moveSlide(direction) {
        setIndex((data.length + index + direction) % data.length);
    }

    function nextSlide() {
        moveSlide(1);
    }

    function prevSlide() {
        moveSlide(-1);
    }

    return (
        <>
            <button onClick={prevSlide}>Prev</button>
            <button onClick={nextSlide}>Next</button>
            <h1>{slide.title}</h1>
            <img src={slide.src} />
            <p>
                {slide.description}
            </p>
        </>
    )
}

export default Gallery;