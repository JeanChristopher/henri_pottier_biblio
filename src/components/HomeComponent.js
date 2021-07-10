import React from "react";
import { Card, CardImg, CardText, CardBody, CardSubtitle, CardTitle} from 'reactstrap'
import { Loading } from './LoadingComponent'

function RenderCard({item, parcour_isLoading, parcour_ErrMess }){

    if (parcour_isLoading){
        return(            
            <Loading />           
        );
    }
    else if (parcour_ErrMess){
        return(            
            <h4>{parcour_ErrMess}</h4>
        );
    }

    else{
        return(
            <Card>
                <CardImg width="100%" src={item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {/* We check if our item contain a designation property */}
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
            </Card>
        );
    }
}

function Home(props) {
    return(
        <div classname="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.parcours_hp} 
                                parcour_isLoading={props.parcour_isLoading}
                                parcour_ErrMess = {props.parcour_ErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotions_hp} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leaders_hp} />
                </div>
            </div>
        </div>
    )
}

export default Home; 