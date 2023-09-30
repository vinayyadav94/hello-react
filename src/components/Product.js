import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { getProducts } from '../store/productSlice';
import { Alert } from 'react-bootstrap';
import StatusCode from '../utils/StatusCode';
import Spinner from 'react-bootstrap/Spinner';
import '../components/Product.css';


const Product = () => {
    const dispatch = useDispatch();

    //const [products, getProducts] = useState([]);
    const {data: products, status} = useSelector(state=>state.products);

    useEffect(() => {
        // dispatch an action for fetch products using redux-toolkit
        dispatch(getProducts());
        //api call
        // fetch('https://fakestoreapi.com/products')
        //     .then(data => data.json())
        //     .then(result => getProducts(result))
    }, []);

    if(status === StatusCode.LOADING){
        return (
            <div className='center'>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            </div>
        )
    }
    if(status === StatusCode.ERROR){
        return <Alert key='danger' variant='danger'>
            something went wrong... please try again...
        </Alert>
    }

    const addToCart = (product) => {
        //dispatch an add action
        dispatch(add(product));
    }

    const cards = products.map(product => (
        <div className='col-md-3' style={{marginBottom: '10px'}}>
            <Card key= {product.id} className='h-100'>
                <div className='text-center'>
                    <Card.Img variant="top" src={product.image} style={{width: '100px', height: '130px'}} />
                </div>
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                        INR: {product.price}
                    </Card.Text>
                </Card.Body>
                <Card.Footer style={{background:'white'}}>
                <Button variant="primary" onClick={()=>addToCart(product)}>Add to cart</Button>
                </Card.Footer>
            </Card>
        </div>
    ))
    return (
        <>
            <h1>Product Dashboard</h1>
            <div className='row' style={{marginLeft:'10px', marginRight:'10px'}}>
                {cards}
            </div>
        </>
    )
}
export default Product;