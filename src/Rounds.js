import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router';
import logo from './logo.png';
import './App.css';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from "react-bootstrap/Button";

import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

import Firebase from "firebase";
import config from "./config";

import uuid from 'react-uuid';
import Alert from "react-bootstrap/Alert";

const Rounds = (props) => {

    const [postalCode, setPostalCode] = useState('');

    const [name, setName] = useState('');
    const updateName = (e) => {
        const myValue = e.target.value;
        setName(myValue)
    }
    const [where, setWhere] = useState('');
    const updateWhere = (e) => {
        const myValue = e.target.value;
        setWhere(myValue)
    }
    const [when, setWhen] = useState('');
    const updateWhen = (e) => {
        const myValue = e.target.value;
        setWhen(myValue)
    }
    const [description, setDescription] = useState('');
    const updateDesc = (e) => {
        const myValue = e.target.value;
        setDescription(myValue)
    }
    const [directed, setDirected] = useState('');
    const updateDirected = (e) => {
        const myValue = e.target.value;
        setDirected(myValue)
    }

    const [rounds, setRounds] = useState([]);

    const [show, setShow] = useState(false);


    useEffect(()=>{
        setPostalCode(props.match.params.id.toUpperCase())

        if (!Firebase.apps.length) {
            Firebase.initializeApp(config);


        }else{

        }

        let roundsData = []
        Firebase.database().ref('regions/' + props.match.params.id.toUpperCase() + "/").once('value', function (snap) {
            snap.forEach(function (childSnapshot) {

                let childKey = childSnapshot.key;
                // this is the channel uuid json
                let childData = childSnapshot.val();
                console.log(childKey, childData);

                roundsData.push(childData)



            });
            setRounds(roundsData)

        });

        }, []);

    const createRound = () =>{
        let uniqueId = uuid();

        Firebase.database()
            .ref("/regions/"+postalCode+"/"+uniqueId)
            .set({
                name: name,
                where: where,
                when: when,
                description: description,
                directed: directed,
                attending: 0

            });
        setShow(true)

    }

    const makeCards = () =>{
        let cards = [];
        console.log(rounds.length);
        console.log(rounds);
        for (var i = 0; i < rounds.length; i++) {
            cards.push(
                <Card key={i}>

                    <Card.Body>
                        <Card.Title>{rounds[i].name}</Card.Title>
                        <Card.Text>
                            {rounds[i].description}
                        </Card.Text>
                    </Card.Body>

                    <Card.Title>{rounds[i].where}</Card.Title>
                    <Card.Title>{rounds[i].when}</Card.Title>
                    <Card.Footer>
                        <small className="text-muted">{rounds[i].directed}</small>
                    </Card.Footer>
                </Card>
            )
        }
        return cards


    }

    const submittedAlert = () =>{
        if (show === true){
            return(
                <Alert variant="success">
                    Round submitted and is pending approval
                </Alert>
            )
        }else{
            return(
            <div style={{marginRight:"20px", marginLeft:"20px"}}>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Name of Round</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="What I learned this week"
                        aria-label="title"
                        aria-describedby="basic-addon1"
                        value={name}
                        onChange={updateName}
                        required
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Where</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Link or Physical Address"
                        aria-label="where"
                        aria-describedby="basic-addon1"
                        value={where}
                        onChange={updateWhere}
                        required
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">When</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Time - Month Day, Year"
                        aria-label="where"
                        aria-describedby="basic-addon1"
                        value={when}
                        onChange={updateWhen}
                        required
                    />
                </InputGroup>

                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Describe this round</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="textarea" aria-label="With textarea" value={description}
                                 onChange={updateDesc} required/>
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Directed at</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Just pharmacists? All HCPs? The public?"
                        aria-label="who"
                        aria-describedby="basic-addon1"
                        value={directed}
                        onChange={updateDirected}
                        required
                    />
                </InputGroup>
                <br/>
                <Button onClick={createRound} variant={"info"}>Schedule round</Button>
                <br/>
                <br/>
            </div>
            )

        }
    }
    const orSch = () =>{
        if (rounds.length > 0){
            return(
                <h6>...or schedule a new round</h6>
            )
        }else{
            return (
                <h6>No rounds yet, be the first to schedule a round</h6>
            )
        }
    }

    return (
        <div className="App">
            <a onClick={()=> props.history.push("")}>
                <img src={logo} style={{height:"50px"}} alt="logo" />
            </a>

            <h1>{postalCode}</h1>


            <div style={{marginRight:"20px", marginLeft:"20px"}}>
                <CardColumns>


                    {makeCards()}

                </CardColumns>
            </div>
            <br/>
            <br/>
            {orSch()}
            {submittedAlert()}

        </div>
    );
}

export default withRouter(Rounds);