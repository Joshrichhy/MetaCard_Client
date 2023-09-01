import React, {useEffect, useState} from "react";
import "./TopNav"
import TopNav from "./TopNav";
import "../styles/Heroes.css"
import plentycards from "../../src/asset/images/plentycards.jpeg"
import pointOfTransaction from "../../src/asset/images/pointoftransaction.png"
import card2 from "../../src/asset/images/card2.png"
import cards from "../../src/asset/images/cards.png"
import Register from "./Register";
import Login from "./Login";



const slideData = [ <div className="Slide"><img src={plentycards} alt="multicards"/></div>,
    <div className="Slide"><img className="pot" src={pointOfTransaction} alt="multicards"/></div>,
    <div className="Slide"><img className="pot" src={cards} alt="multicards"/></div>,
    <div className="Slide"><img className="pot" src={card2} alt="multicards"/></div>];
function Heroes(){
    const [currentIndex, setCurrentIndex] = useState(0);
    const[isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % slideData.length );

    };

    useEffect(() => {
        const interValid = setInterval(nextSlide, 3000);
        return() => {
            clearInterval(interValid)
        }
    }, [currentIndex]);

        return(
            <div className="slideContainer">
                    <TopNav openModal = {openModal}/>
                <div className="carousel-container">
                <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {slideData.map((slide, index) => (
                        <div key={index} className="slide">
                            {slide}
                        </div>
                    ))}
                </div>
                </div>
                <Register isOpen = {isModalOpen} isClose={closeModal}/>
                <Login isOpen = {isModalOpen} isClose={closeModal}/>

            </div>

        )
}
export default Heroes;