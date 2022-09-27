import 'semantic-ui-css/semantic.min.css'

import React, {Component} from 'react'
import { useNavigate } from 'react-router-dom'
import TinderCard from 'react-tinder-card'

import {Button, Icon, Image, Modal, Grid, Transition, Header, Segment, Label, Message} from 'semantic-ui-react'
import DataService from "./services/data-service"

let ds = new DataService()

let SITE_NAME = "http://localhost:3000";
let data1 = [
    {
        "product_id": 8,
        "category": "Interest: Lifestyle",
        "name": "Dieting",
        "product_attributes": {
            "color": "black",
        },
        "image_link": SITE_NAME + "/cards/interests/lifestyle/dieting.png"
    },
    {
        "product_id": 7,
        "category": "Interest: Sports",
        "name": "NBA",
        "product_attributes": {
            "color": "black",
        },
        "image_link": SITE_NAME + "/cards/interests/sports/NBA.png"
    },
    {
        "product_id": 6,
        "category": "Interest: Lifestyle",
        "name": "Nutrition",
        "product_attributes": {
            "color": "black",
        },
        "image_link": SITE_NAME + "/cards/interests/lifestyle/nutrition.png"
    },
    {
        "product_id": 5,
        "category": "Interest: Sports",
        "name": "NFL",
        "product_attributes": {
            "color": "black",
        },
        "image_link": SITE_NAME + "/cards/interests/sports/NFL.png"
    },
    {
        "product_id": 4,
        "category": "Interest: Lifestyle",
        "name": "Natural-Products",
        "product_attributes": {
            "color": "black",
        },
        "image_link": SITE_NAME + "/cards/interests/lifestyle/natural-products.png"
    },
    {
        "product_id": 3,
        "category": "Interest: Sports",
        "name": "Surf",
        "product_attributes": {
            "color": "black",
        },
        "image_link": SITE_NAME + "/cards/interests/sports/surf.png"
    },
    {
        "product_id": 2,
        "category": "Interest: Lifestyle",
        "name": "Energy",
        "product_attributes": {
            "color": "black",
        },
        "image_link": SITE_NAME + "/cards/interests/lifestyle/energy.png"
    },
    {
        "product_id": 1,
        "category": "Athelete: Nascar",
        "name": "Chase Elliot",
        "product_attributes": {
            "color": "black",
        },
        "image_link": SITE_NAME + "/cards/athletes/chase-elliott.png"
    }
]


class SwipeViewModal extends Component {


    constructor(props) {
        super(props);
        this.state = {products: [], downVisibility: true, upVisibility: true, cartVisibility: true, favoriteVisibility: true};
        this.loadProducts = this.loadProducts.bind(this);
        this.productUpvote = this.productUpvote.bind(this);
        this.productDownVote = this.productDownVote.bind(this);

        this.onSwipe = this.onSwipe.bind(this);
        this.cardGallery = this.cardGallery.bind(this);

    }

    loadProducts = () => {
        ds.addProduct(data1)
        console.log("load prods being called");
        let firstProduct = ds.getNextProduct();
        console.log(firstProduct)
        this.setState({
            visible: true,
            products:firstProduct
        })

    };

    productUpvote = () => {
        this.setState((prevState) => ({ upVisibility: !prevState.upVisibility,  products: ds.upVote() }))

    };

    productDownVote = () => {
        this.setState((prevState) => ({ downVisibility: !prevState.downVisibility,  products: ds.downVote() }))
    };

    onSwipe = (direction) => {
        console.log("swiped " + direction)

        if (direction === 'right') {
            this.productUpvote();
        } else if (direction === 'left') {
            this.productDownVote();
        }

         if (ds.isLastProduct()){
            const navigate = useNavigate();
            navigate("/");
            return;
        }


    }


    cardGallery = () => {
        if(this.state.products != null) {
            const list = this.state.products.map((product) =>
                <div>
                    <Segment inverted>
                        <Header as='h4' inverted color='black'>
                          {product.category}
                        </Header>
                    </Segment>
                    <TinderCard onSwipe={this.onSwipe} flickOnSwipe={false}>
                        <Image rounded wrapped src={product.image_link} />
                        <Label attached='bottom' clear>{product.name}</Label>
                    </TinderCard>

                </div>
            );
            return (list);
        }
        else {
            return (
                <div>
                <h1> Congrats!</h1>
                <p> You're 83% aligned with Billy Kemper</p>
                <Message>
                    <Message.Header>Use the code below to get 15% off your next purchase</Message.Header>
                    <h1>
                     bcx-5235
                    </h1>
                  </Message>
                </div>
            );
        }
    };


    render() {

        return (
            <div className="homepage-modal">
                <h1> Hey You ! </h1>
                <p> Take This Quiz To Get 15% Off Your Next Order </p>
                <p> hi </p>
                <Modal trigger={<Button>Let's Do It</Button>} size={'mini'} rounded-corners centered={false} onOpen={() => this.loadProducts()}>
                    <Modal.Content image>
                        <Grid textAlign='center' verticalAlign='middle' columns={1}>
                            <Grid.Row>
                                <Grid.Column >
                                    {this.cardGallery()}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <Transition
                                        animation="bounce"
                                        duration="2000"
                                        visible={this.state.upVisibility}
                                    >
                                        <Icon link circular inverted name='thumbs up' floated='bottom'  size='big' onClick={() => this.productUpvote()}/>
                                    </Transition>
                                </Grid.Column>
                                <Grid.Column>
                                    <Icon link circular inverted name='redo' floated='bottom'  size='big' onClick={() => this.productUpvote()}/>
                                </Grid.Column>
                                <Grid.Column>
                                  <Transition
                                        animation="bounce"
                                        duration="2000"
                                        visible={this.state.downVisibility}
                                    >
                                        <Icon link circular inverted name='thumbs down' floated='bottom' size='big' onClick={() => this.productDownVote()}/>
                                    </Transition>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                </Modal>
            </div>



                )
    }
}


export default SwipeViewModal
