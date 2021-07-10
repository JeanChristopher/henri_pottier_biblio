import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom' ;
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl'

    /**
     * 
     * @param {parcour} params0 we receive the parcours_p from the menu component and pass it to parcour params as props 
     * @param {onClick} params1 we receive the params from the onClick method in menu component as props  
     * @returns { Card html element } all the parcours in the parcours files
     */
    function RenderMenuItem({parcour}){
        return (
            <Card>
                {/* We introduce a react router parameter so that when we click on a chosen parcours it link to the path of that particular parcour */}                
                <Link to={`/menu/${parcour._id}`}>
                    <CardImgOverlay>
                        <CardTitle tag="h4"> {parcour.name} </CardTitle>
                    </CardImgOverlay>
                    <CardImg width="100%" src={baseUrl + parcour.image} alt={parcour.name}></CardImg>
                    
                </Link>
            </Card>
        );
    }

    /**
     * 
     * @param {properties of the menu component that we receive from Main component} props
     * @returns {all the parcours_p items: }
     */

    const Menu = (props) => {
        const menu = props.parcours_p.map((parcour) => {
            return (
                // key is a special parameters needeed when we have to display a list of items
                <div key= {parcour._id} className="col-12 col-md-5 m-1">
                    {/* We pass the props parameters to the render function */}
                    <RenderMenuItem parcour={parcour}/>
                </div>
            );
        });
        
        if (props.parcours_areLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>                
                </div>            
            );
        }

    else if (props.parcours_ErrMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.parcours_ErrMess}</h4>
                </div>                
            </div>
        );
    }
    else {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
    
                </div>
                <div className="row">
                    {menu}
                </div>                                
            </div>
        );
    }
    
}

export default Menu;