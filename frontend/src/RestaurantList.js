import React, { Component } from 'react';
import RestaurantService from './RestaurantService';

const restaurantsService = new RestaurantService();

class RestaurantList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
        };
    }

    componentDidMount() {
        var self = this;
        restaurantsService.getRestaurants().then(function (result) {
            console.log(result)
            self.setState({ restaurants: result })
        });
    }
    render() {

        return (
            <div className="customers--list">
                <table className="table">
                    <thead key="thead">
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Ubicación</th>
                            <th>Tipo de comida</th>
                            <th>Calificación</th>
                            <th>Visitado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.restaurants.map((value, index) =>
                            <tr key={value.id}>
                                <td>{index+1}</td>
                                <td>{value.name}</td>
                                <td>{value.location}</td>
                                <td>{value.kind_food}</td>
                                <td>{value.rating}</td>
                                <td>{value.visited ? 'True' : 'False'}</td>
                                <td>
                                    <button className="btn btn-warning mr-2">Editar</button>
                                    <button className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default RestaurantList;