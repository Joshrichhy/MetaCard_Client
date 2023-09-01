import React from "react";
import "../styles/TopNav.css"
import axios from "axios";

export default function TopNav({openModal}){

    const countUsers = async (event) => {
        event.preventDefault();
        console.log("in")
            const token = localStorage.getItem('userToken');

            axios.get('http://localhost:8081/api/v1/customer/countUsers/',
                {
                    headers: {
                        'Authorization': `Bearer 
                        ${token}`
                    }
                }).then(response => {

                           console.log(response.data)
            }).catch(error => {
                if (error.response.status === 403) {
                    console.log("not authenticated")
                }
            });

        }

    return(
        <React.Fragment>
            <nav className= "TopNav">
                <div>
                    <span className="companyName">MetaCard</span>
                </div>

                <div>
                    <a onClick={countUsers}>Multi-cards</a>
                    <a>About</a>
                    <button onClick={openModal}>Register</button>
                    <button onClick={openModal}>Login</button>
                </div>
                </nav>
        </React.Fragment>
    )
}