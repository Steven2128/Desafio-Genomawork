import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import RestaurantService from './RestaurantService';

const restaurantsService = new RestaurantService();

class RestaurantList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            modalInsertar: false,
        };
    }
    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }

    componentDidMount() {
        var self = this;
        restaurantsService.getRestaurants().then(function (result) {
            self.setState({ restaurants: result })
        });
    }

    handleCreate() {
        restaurantsService.createRestaurant({
            "name": this.refs.name.value,
            "location": this.refs.location.value,
            "kind_food": this.refs.kind_food.value,
            "rating": this.refs.rating.value,
            "visited": this.refs.visited.checked,
        }).then(result => {
            this.modalInsertar();
            this.componentDidMount();
        });
    }


    render() {

        return (
            <div className="customers--list">
                <h1>Restaurantes</h1>
                <button className="btn btn-success float-right" onClick={() => this.modalInsertar()}>Agregar Restaurante</button>
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
                                <td>{index + 1}</td>
                                <td>{value.name}</td>
                                <td>{value.location}</td>
                                <td>{value.kind_food}</td>
                                <td>{value.rating}</td>
                                <td>
                                {value.visited ? <FontAwesomeIcon className="text-success" icon={faCheck} /> : <FontAwesomeIcon className="text-danger" icon={faTimes} />}
                                </td>
                                <td>
                                    <button className="btn btn-warning mr-2"><FontAwesomeIcon icon={faEdit} /></button>
                                    <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} /></button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                        Agregar Restaurante nuevo
                        <button className="btn btn-close float-right" onClick={() => this.modalInsertar()}>X</button>
                    </ModalHeader>

                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input className="form-control" type="text" name="name" id="name" ref="name" />
                            <label htmlFor="ubicacion">Ubicación</label>
                            <input className="form-control" type="text" name="location" id="location" ref="location" />
                            <label htmlFor="Tipo de comida">Tipo de comida</label>
                            <input className="form-control" type="text" name="kind_food" id="kind_food" ref="kind_food" />
                            <label htmlFor="calificacion">Calificación</label>
                            <input className="form-control" type="number" name="rating" id="rating" max="5" min="0" ref="rating" />
                            <label htmlFor="visitado">Visitado</label>
                            <input className="form-control" type="checkbox" name="visited" id="visited" ref="visited" />
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <button className="btn btn-success" onClick={() => this.handleCreate()}>Agregar</button>
                        <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default RestaurantList;