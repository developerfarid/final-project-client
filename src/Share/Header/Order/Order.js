import axios from 'axios';
import Swal from 'sweetalert2';
import { faStar as Star } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Rating from 'react-rating';
import { useHistory, useLocation, useParams } from 'react-router';
import UseAuth from '../../../Hooks/UseAuth';

const full = <FontAwesomeIcon icon={faStar} />
const ementy = <FontAwesomeIcon icon={Star} />



const Order = () => {
    const [pd, setPd] = useState({})
    const { id } = useParams()
    const { user, order } = UseAuth()
    const history = useHistory()
    console.log(pd);

    const { register, handleSubmit, reset, errors } = useForm(); // initialize the hook
    useEffect(() => {
        fetch(`https://afternoon-bayou-21114.herokuapp.com/product/${id}`).then(res => res.json()).then(dataProduct => setPd(dataProduct))
    }, [])
    const onSubmit = (data) => {
        const success = () => {
            Swal.fire(
                'Congratulations ',
                'You have successfully Add ',
                'success'
            )
        }
        data.status = "Pending";
        data.email= user.email
        data.title= pd?.title    
        data.displayName= pd?.displayName    

   
            axios.post("https://afternoon-bayou-21114.herokuapp.com/order", data)
            .then(response => {
                if (response.data.insertedId) {
                    success()
                    reset()
                    history.push("/pay")
                    window.location.reload();

                }
            })
        
    };
    return (
        <Container>
            <Row>
                <Col>
                    <div className="product-information mt-5">
                    <img className=" img-fluid w-100" src={pd.url} alt="" />

                    <h1>{ }</h1>
                    <h3>{pd?.title}  </h3>
                    <p className="d-flex  justify-content-between">  <span>Price: {pd.price}</span><Rating emptySymbol={ementy} fullSymbol={full} initialRating={pd?.rating} readonly stop="5" /></p>
                    <h3>Product Overview </h3>
                    <p>{pd?.des}</p>
                    </div>
                </Col>
                <Col>
                    <div className="form">
                        <h1>Order Now</h1>
                        <p></p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input value={user?.displayName}  {...register("name")} />
                            <input className="my-3" value={user?.email}  {...register("email")} />
                            <input type="number" placeholder="Phone Number" {...register("number")} />
                            <input className="my-3" placeholder="Address" {...register("address")} />
                            <input className="my-3" type="submit" value="Order Now" />
                        </form>
                    </div>

            </Col>
        </Row>
    </Container >
    );
};

export default Order;