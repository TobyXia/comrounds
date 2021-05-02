import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router';
import logo from './logo.png';
import './App.css';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from "react-bootstrap/Button";

const Home = (props) => {
    const [inputValue, setInputValue] = useState('M5S');


    const goToPostalCode = () =>{
        props.history.push({
            pathname: ('postalCode/' + inputValue),
        })
    }

    const updateInputValue = (e) => {
        const myValue = e.target.value;
        setInputValue(myValue)
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} style={{height:"100px"}} alt="logo" />
            </header>
            <div>
                <h2>
                    Start with half of your postal code:
                </h2>
                <br />
                <div style={{marginLeft:"20px",marginRight:"20px"}}>
                    <InputGroup size="lg">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-lg" >1st-half</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Postal" aria-describedby="inputGroup-sizing-sm" placeholder="example: M5S or P1B" value={inputValue} onChange={updateInputValue} required/>
                        <Button type="submit" onClick={goToPostalCode} variant={"info"}>Go</Button>
                    </InputGroup>
                </div>
                <br/>
                <br/>
                <h5>
                    Community Patient Rounds in your neighborhood
                </h5>
                <p>
                    Rounds by postal code, more tight knit than LHIN's and no need for a hospital organizer
                </p>
                <br/>
                <h5>
                    Seminars and Discussions
                </h5>
                <p>
                    Find seminars made by other local health care professionals
                </p>
                <br/>
                <h5>
                    Accredited Continuing Education
                </h5>
                <p>
                    Attend continuing education events (CEs), tracked on Comrounds
                </p>
            </div>
        </div>
    );
}

export default withRouter(Home);