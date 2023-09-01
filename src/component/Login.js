import React, {useState} from "react";
import axios from "axios";

function Login({ isOpen, isClose }){
    const [formData, setFormData] = useState({
        emailAddress: '',
        password: '',
    });

    const[Message, setMessage] = useState("");


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

                const response = await axios.post('http://localhost:8081/api/v1/login', formData);
                localStorage.setItem("userToken", response.data.access_token)
                console.log(response.data)
            // Handle successful registration response, e.g. show a success message.
        } catch (error) {
            if(error.response.status === 403){
                setMessage("invalid credentials")
            }

            // Handle registration error, e.g. display an error message.
        }
    };

    return(
        <div className="modal-overlay">
            <div className="modal-content">
               Login
                <form onSubmit={handleSubmit} onClick={isClose}>
                    <br />
                    <input className = "email"
                           name = "emailAddress"
                           type="email" placeholder="Enter your email address"
                           required={true}
                           value={formData.emailAddress}
                           onChange={handleChange}/>
                    <br />
                    <br />
                    <input className = "password"
                           name = "password"
                           required={true}
                           type="password" placeholder="Enter password"
                           value={formData.password}
                           onChange={handleChange} />
                    <br/>
                    <br />
                    <button type="submit">
                        Submit
                    </button>
                    <p>{Message}</p>
                </form>

            </div>
        </div>
    )
}

export default Login;