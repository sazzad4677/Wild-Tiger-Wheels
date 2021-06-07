import React, { useEffect, useState } from "react";
import { Card, CardColumns, CardDeck, Container, Row } from "react-bootstrap";
import fakeData from "../FakeData/fakeData.json";
import car from "../../images/car.jpg";
import "./VehicleList.css";
import { Link } from "react-router-dom";

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        setVehicles(fakeData.slice(0, 4));
    }, []);
    return (
        <Container className="main-div">
            <Row className="h-100 align-items-center ml-5">
                <CardDeck className="car-list col-md-12">
                    {vehicles.map((vehicle) => (
                        <Card key={vehicle.id}  className="col-md-3">
                            <Link to={`/destination/${vehicle.vehicle_type}`}>
                                <Card.Img
                                    className="card-img-top align-item-center"
                                    src={vehicle.vehicle_image}
                                    width="200"
                                    height="100"
                                    alt=""
                                />
                                <Card.Body>
                                    <Card.Title className="text-center text-decoration-none">
                                        {vehicle.vehicle_type}
                                    </Card.Title>
                                </Card.Body>
                            </Link>
                        </Card>

                    ))}
                </CardDeck>
            </Row>
        </Container>
    );
};

export default VehicleList;
