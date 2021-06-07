import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import Header from '../Header/Header';
import './Destination.css'
import map from '../../images/Map.png'
import { Link, useParams } from 'react-router-dom';
import FakeLocation from '../FakeData/FakeLocation.json'
import peopleIcon from "../../images/peopleicon.png"
import Map from "../Map/Map"


const Destination = () => {
    const { vehicle_type } = useParams();
    //state for search button
    const [searched, setSearched] = useState(false);
    //state for data load
    const [vehicles, setVehicle] = useState([]);
    //state for search data
    const [data, setData] = useState({
        from: "",
        to: "",
        error:""
    });
    //state for final match data
    const [matchData, setMatchData] = useState([])
    //load data
    useEffect(() => {
        const allData = FakeLocation.filter((x) => x.vehicle_type === vehicle_type);
        setVehicle(allData);
    }, [vehicle_type]);

    const pickData = (e) => {
        const locationInfo = { ...data }
        locationInfo[e.target.name] = e.target.value;
        setData(locationInfo);
    }
    const handelSubmit = (e) => {
        setSearched(true);
        const matching = vehicles.filter(vehicle => vehicle.from == data.from && vehicle.to == data.to)
        setMatchData(matching);
        if(matching.length === 0) {
            data.error = "No data found or No vehicle selected."
        }
        else{
            data.error = "";
        }
        e.preventDefault();
    }

    return (
        <div>
            <Header></Header>
            <Container className="d-flex mt-3">
                <div className="col-md-4 destination">
                    <div>
                        {!searched &&
                            <Form onSubmit={handelSubmit} className="pick-form">
                                <Form.Group>
                                    <Form.Label className="mt-2 label">Pick From</Form.Label>
                                    <Form.Control name="from" onBlur={pickData} type="text" placeholder="Madaripur" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="label">Pick To</Form.Label>
                                    <Form.Control name="to" onBlur={pickData} type="text" placeholder="Rajbari" />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="submit-btn mb-3">
                                    Search
                                </Button>
                            </Form>}
                        {searched &&
                            <div>
                                <div className="top-card mt-2">
                                    <p className="location mt-2 ml-5">{data.from}</p>
                                    <p className="location mt-2 ml-5">{data.to}</p>
                                </div>
                                <p style={{color: 'red', textAlign: 'center'}}>{data.error}</p>
                                {
                                    matchData.map((x) =>
                                        <div>
                                            <Card className="w-100 mt-3">
                                                <Row className="no-gutters">
                                                    <Card.Body className="">
                                                        <div key={x.id} className="col-sm-12 d-flex">
                                                            <Card.Img src={x.vehicle_image} alt="vehicle image" className="vehicle-image" />
                                                            <Card.Title className="ml-3 mt-2">{x.vehicle_type}</Card.Title>
                                                            <Card.Img src={peopleIcon} alt="people icon" className="person" />
                                                            <Card.Text className="ml-5 price">${x.price}</Card.Text>
                                                        </div>
                                                    </Card.Body>
                                                </Row>
                                                
                                            </Card>
                                        </div>
                                    )
                                }
                                <Button onClick={() =>setSearched(false)} variant="primary" type="submit" className="submit-btn mb-3 mt-2">
                                    Go Back
                                </Button>
                            </div>}
                    </div>
                </div>
                <div className="col-md-8">
                    {/* <img src={map} alt="" /> */}
                    <Map></Map>
                </div>
            </Container>
        </div>

    );
};

export default Destination;