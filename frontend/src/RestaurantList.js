import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheck, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import RestaurantService from './RestaurantService';

const restaurantsService = new RestaurantService();

class RestaurantList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            modalInsertar: false,
            activeItem: {
                id: null,
                name: "",
                location: '',
                kind_food: '',
                rating: 0,
                visited: false
              },
            direction: '',
        };
    }
    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
        this.handleReset();
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

    handleDelete(pk) {
        var self = this;
        restaurantsService.deleteRestaurant({ id: pk }).then(() => {
            var newArr = self.state.restaurants.filter(function (obj) {
                return obj.pk !== pk;
            });
            self.setState({ restaurants: newArr });
            this.componentDidMount();
        });
    }

    handleChange = (e) => {
        let { name, value } = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
    }

    handleSelect(item){
        this.setState({activeItem: item, modalInsertar: !this.state.modalInsertar});

    }

    handleReset(){
        this.setState({
            activeItem:{
                id: null,
                name: "",
                location: '',
                kind_food: '',
                rating: 0,
                visited: false
            }
        });
    }

    handleUpdate(){
        restaurantsService.updateRestaurant(this.state.activeItem).then(result => {
            this.modalInsertar();
            this.componentDidMount();
        });
    }

    sortByColumn(column){
        if (this.state.direction == '' || this.state.direction == 'descending'){
            this.setState({restaurant: this.state.restaurants.sort((a, b) => (a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0))});
            this.setState({direction: 'ascending'});
        }else if(this.state.direction == 'ascending'){
            this.setState({restaurant: this.state.restaurants.sort((b, a) => (a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0))});
            this.setState({direction: 'descending'});
        }
    }

    render() {
        const activeItem = this.state.activeItem;
        let button;
        if(activeItem.id == null){
            button = <button className="btn btn-success" onClick={() => this.handleCreate()}>Agregar</button>
        }else{
            button = <button className="btn btn-success" onClick={() => this.handleUpdate()}>Actualizar</button>

        }
        return (
            <div className="customers--list">
                <h1>Restaurantes</h1>
                <button className="btn btn-success float-right mb-2" onClick={() => this.modalInsertar()}>Agregar Restaurante <FontAwesomeIcon className="ml-1" icon={faPlus} /></button>
                <table className="table">
                    <thead key="thead">
                        <tr >
                            <th >#</th>
                            <th onClick={() => this.sortByColumn('name')}><span style={{cursor: 'pointer'}}>Nombre</span></th>
                            <th onClick={() => this.sortByColumn('location')}><span style={{cursor: 'pointer'}}>Ubicación</span></th>
                            <th onClick={() => this.sortByColumn('kind_food')}><span style={{cursor: 'pointer'}}>Tipo de comida</span></th>
                            <th onClick={() => this.sortByColumn('rating')}><span style={{cursor: 'pointer'}}>Calificación</span></th>
                            <th onClick={() => this.sortByColumn('visited')}><span style={{cursor: 'pointer'}}>Visitado</span></th>
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
                                    <button className="btn btn-warning mr-2" onClick={() => this.handleSelect(value)}><FontAwesomeIcon icon={faEdit} /></button>
                                    <button className="btn btn-danger" onClick={(e) => this.handleDelete(value.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
                <Modal isOpen={this.state.modalInsertar} activeItem={this.state.activeItem}>
                    <ModalHeader style={{ display: 'block' }} >
                        Agregar Restaurante nuevo
                        <button className="btn btn-close float-right" onClick={() => this.modalInsertar()}>X</button>
                    </ModalHeader>

                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input className="form-control" type="text" name="name" id="name" ref="name" placeholder="Ingrese el nombre del restaurante" onChange={this.handleChange} value={activeItem.name}/>
                            <label htmlFor="ubicacion">Ubicación</label>
                            <input className="form-control" type="text" name="location" id="location" ref="location" placeholder="Ingrese la ubicación del restaurante"onChange={this.handleChange} value={activeItem.location}/>
                            <label htmlFor="Tipo de comida">Tipo de comida</label>
                            <input className="form-control" type="text" name="kind_food" id="kind_food" ref="kind_food" placeholder="Ingrese el tipo de comida" onChange={this.handleChange} value={activeItem.kind_food}/>
                            <label htmlFor="calificacion">Calificación</label>
                            <input className="form-control" type="number" name="rating" id="rating" max="5" min="0" ref="rating" placeholder="Ingrese una calificación del 0 al 5" onChange={this.handleChange} value={activeItem.rating}/>
                            <label htmlFor="visitado" check>Visitado</label>
                            <input className="ml-1" type="checkbox" name="visited" id="visited" ref="visited" placeholder="Enter Todo Title" onChange={this.handleChange} checked={activeItem.visited}/>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        {button}
                        <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default RestaurantList;