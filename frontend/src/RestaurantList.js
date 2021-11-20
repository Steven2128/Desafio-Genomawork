import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheck, faTimes, faPlus, faStar, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons'

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
            direction: 'descending',
            input: '',
            restaurantsBackup: []
        };
    }
    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
        this.handleReset();
    }

    componentDidMount() {
        var self = this;
        restaurantsService.getRestaurants().then(function (result) {
            self.setState({ restaurants: result, restaurantsBackup: result })
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
        if (this.state.direction == 'descending'){
            this.setState({restaurant: this.state.restaurants.sort((a, b) => (a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0))});
            this.setState({direction: 'ascending'});
        }else if(this.state.direction == 'ascending'){
            this.setState({restaurant: this.state.restaurants.sort((b, a) => (a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0))});
            this.setState({direction: 'descending'});
        }
    }

    onChangeHandler(e){
        this.setState({
            input: e.target.value,
        })
    }

    filter(event){
        console.log(event.target.value)
        const data = this.state.restaurantsBackup
        var text = event.target.value

        const newData = data.filter(function(item){
          const itemDataName = item.name.toUpperCase()
          const itemDataLocation = item.location.toUpperCase()
          const itemDataKindFood = item.kind_food.toUpperCase()
          const itemDataVisited = item.visited.toString().toUpperCase()
          const itemData = itemDataName+" "+itemDataLocation+" "+itemDataKindFood+" "+item.rating+""+itemDataVisited
          const textData = text.toUpperCase()
          return itemData.indexOf(textData) > -1
        });
        this.setState({
            restaurants: newData,
            input: text,
        })
    }
   

    render() {
        var self = this;

        const activeItem = this.state.activeItem;
        
        const renderStars = stars =>{
            let content = [];
            const starsWhite = 5 - stars;
            for(let i=0; i<stars; i++){
                content.push(<FontAwesomeIcon icon={faStar} className="text-warning"/>)
            }
            for(let i=0; i<starsWhite; i++){
                content.push(<FontAwesomeIcon icon={farStar} className="text-secondary"/>)
            }
            return content;
        }
        
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
                <div className="form-row">
                    <div className="col offset-8">
                        <input className="form-control float-right" type="text" placeholder="Buscar..." value={this.state.text} onChange={(text) => this.filter(text)}/>
                    </div>
                </div>
                <table className="table">
                    <thead key="thead">
                        <tr>
                            <th>#</th>
                            <th onClick={() => this.sortByColumn('name')}>
                                <span>Nombre<FontAwesomeIcon className="ml-2"  
                                icon={this.state.direction == 'descending' ? faArrowDown: faArrowUp} />
                                </span>
                            </th>
                            <th onClick={() => this.sortByColumn('location')}>
                                <span>Ubicación<FontAwesomeIcon className="ml-2"  icon={this.state.direction == 'descending' ? faArrowDown: faArrowUp} />
                                </span>
                            </th>
                            <th onClick={() => this.sortByColumn('kind_food')}>
                                <span>Tipo de comida<FontAwesomeIcon className="ml-2"  icon={this.state.direction == 'descending' ? faArrowDown: faArrowUp} />
                                </span>
                            </th>
                            <th onClick={() => this.sortByColumn('rating')}>
                                <span>Calificación<FontAwesomeIcon className="ml-2"  icon={this.state.direction == 'descending' ? faArrowDown: faArrowUp} />
                                </span>
                            </th>
                            <th onClick={() => this.sortByColumn('visited')}>
                                <span>Visitado<FontAwesomeIcon className="ml-2"  icon={this.state.direction == 'descending' ? faArrowDown: faArrowUp} />
                                </span>
                            </th>
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
                                <td>{renderStars(value.rating)}</td>
                                <td>
                                    {value.visited ? <FontAwesomeIcon className="text-success" icon={faCheck} /> : <FontAwesomeIcon className="text-danger" icon={faTimes} />}
                                </td>
                                <td>
                                    <button className="btn btn-warning mr-2" onClick={() => this.handleSelect(value)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="btn btn-danger" onClick={(e) => this.handleDelete(value.id)}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
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
                            <input className="ml-1" type="checkbox" name="visited" id="visited" ref="visited" onChange={this.handleChange} checked={activeItem.visited}/>
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