//importing the necessary dependencies
import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuidv4 } from 'uuid';

  //initialize the state object
    class App extends Component {
        constructor(props) {
          super(props);
          this.state = {
            cars: [],
            model: '',
            make: '',
            owner: '',
            registration: '',
            address: '',
            olderThanFiveYears: []
          };
        }
      
        //defining the componentDidMount lifecycle method which is called by React after the component is rendered for the first time.
        componentDidMount() {
          fetch('http://localhost:5000/cars')
            .then(response => response.json())
            .then(data => {
              this.setState({ cars: data });
            })
            .catch(error => {
              console.log(error);
            });
        }
      
        //updates the state with the new values of the form fields when the user types something in the form input field.
        handleChange = event => {
          this.setState({ [event.target.name]: event.target.value });
        };
      
        //handles the form submission when the user clicks the "Add Car" button. 
        //It generates a new unique ID for the new car using the uuidv4() function, creates a new
        //car object with the form input values and the generated ID, and sends a POST request to the http://localhost:5000/cars endpoint to add the new car to the database. 
        //Upon successful response, the cars array in the state is updated to include the newly added car object and the form input fields are reset to empty strings.
        handleSubmit = event => {
          event.preventDefault();
          const { model, make, owner, registration, address } = this.state;
          const newCar = {
            id: uuidv4(), // generate a unique id
            model,
            make,
            owner,
            registration,
            address
          };
        
          fetch('http://localhost:5000/cars', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCar)
          })
            .then(res => res.json())
            .then(data => {
              this.setState({
                cars: [...this.state.cars, data],
                model: '',
                make: '',
                owner: '',
                registration: '',
                address: ''
              });
            })
            .catch(error => console.error(error));
        };
        
        //update the data of a car object. 
        //It takes two arguments: the id of the car object to be updated and the updated car object. 
        //It sends a PUT request to the server at http://localhost:5000/cars/${id} with the updated car object in the request body. 
        //If the request is successful, the cars property of the component's state is updated with the updated car object using the map method. 
        //The input values are cleared, the modal is closed, and the editCarId property of the component's state is set to null.
        handleEdit = (id, updatedCar) => {
          fetch(`http://localhost:5000/cars/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCar)
          })
          .then(res => res.json())
          .then(data => {
            const updatedCars = this.state.cars.map(car => {
              if (car._id === id) {
                return data;
              } else {
                return car;
              }
            });
            this.setState({
              cars: updatedCars,
              model: '',
              make: '',
              owner: '',
              registration: '',
              address: '',
              showModal: false,
              editCarId: null
            });
          })
          .catch(error => console.error(error));
        };

        //The handleShowModal method is used to show the modal for editing a car object. 
        //It takes a car object as an argument and sets the showModal, editCarId, model, make, owner, registration, and address properties of the component's state 
        //to the values of the corresponding properties of the car object.
          handleShowModal = car => {
            this.setState({
              showModal: true,
              editCarId: car._id,
              model: car.model,
              make: car.make,
              owner: car.owner,
              registration: car.registration,
              address: car.address
            });
          };
          
          //Close the modal for editing a car object. 
          //It sets the showModal and editCarId properties of the component's state to false and null, respectively.
          handleCloseModal = () => {
            this.setState({ showModal: false, editCarId: null });
          };
          
          //Delete a car object.  It takes an id argument and sends a DELETE request to the server at http://localhost:5000/cars/${id}. 
          //If the request is successful, the cars property of the component's state is updated with the remaining car objects using the filter method.
          handleDelete = id => {
            fetch(`http://localhost:5000/cars/${id}`, {
              method: 'DELETE',
            })
              .then(res => res.json())
              .then(() => {
                const updatedCars = this.state.cars.filter(car => car._id !== id);
                this.setState({ cars: updatedCars });
              })
              .catch(error => console.error(error));
          };

          // filter the car objects that are older than 5 years. 
          //It creates a Date object representing 5 years ago, and then filters the cars property of the component's state 
          //to find car objects whose model date is older than fiveYearsAgo. The filtered car objects are then stored in the olderThanFiveYears property of the component's state.
          handleOlderThanFiveYears = () => {
            const fiveYearsAgo = new Date();
            fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
            const olderThanFiveYears = this.state.cars.filter(car => new Date(car.model) < fiveYearsAgo);
            this.setState({ olderThanFiveYears });
          };
          
          //Close the modal for viewing the cars older than 5 years. 
          //It sets the olderThanFiveYears property of the component's state to an empty array.
          handleCloseOlderThanFiveYears = () => {
            this.setState({ olderThanFiveYears: [] });
          };     
              
  render() {
    return (
      <div className="container">
        <h1 className="display-4 text-center mb-5">Hyperion Cars</h1>
        <br></br>
        <div className="row">
          <div className="col">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="make">Vehicle Make</label>
                <input
                  type="text"
                  className="form-control"
                  id="make"
                  name="make"
                  value={this.state.make}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="model">Vehicle Year Model</label>
                <input
                  type="text"
                  className="form-control"
                  id="model"
                  name="model"
                  value={this.state.model}
                  onChange={this.handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="owner">Vehicle Owner</label>
                <input
                  type="text"
                  className="form-control"
                  id="owner"
                  name="owner"
                  value={this.state.owner}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="registration">Vehicle Registration</label>
                <input
                  type="text"
                  className="form-control"
                  id="registration"
                  name="registration"
                  value={this.state.registration}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Owner Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </div>
              <br></br>
              <button className="btn btn-success btn-block space" type="submit">
                Add Car
              </button>
              
              <button className="btn btn-primary" onClick={this.handleOlderThanFiveYears}>
  View Cars Older Than 5 Years
</button>
            </form>
          </div>
        </div>
        <div className="row mt-4">
          {this.state.cars.map(car => (
            <div className="col-md-4 mb-4" key={car._id}>
              <div className="card">
                <div className="card-body">
                <h5 className="card-title">{car.make} {car.model}</h5>
  <div className="card-text">
    <p><strong>Owner:</strong> {car.owner}</p>
    <p><strong>Registration:</strong> {car.registration}</p>
    <p><strong>Address:</strong> {car.address}</p>
  </div>
                  <button
                    className="btn btn-danger space"
                    onClick={() => this.handleDelete(car._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning ml-2"
                    onClick={() => this.handleShowModal(car)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Car</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
  <div className="form-group">
    <label htmlFor="editModel">Model</label>
    <input
      type="text"
      className="form-control"
      id="editModel"
      name="model"
      value={this.state.model}
      onChange={this.handleChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="editMake">Make</label>
    <input
      type="text"
      className="form-control"
      id="editMake"
      name="make"
      value={this.state.make}
      onChange={this.handleChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="editOwner">Owner</label>
    <input
      type="text"
      className="form-control"
      id="editOwner"
      name="owner"
      value={this.state.owner}
      onChange={this.handleChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="editRegistration">Registration</label>
    <input
      type="text"
      className="form-control"
      id="editRegistration"
      name="registration"
      value={this.state.registration}
      onChange={this.handleChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="editAddress">Address</label>
    <input
      type="text"
      className="form-control"
      id="editAddress"
      name="address"
      value={this.state.address}
      onChange={this.handleChange}
    />
  </div>
</form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={this.handleCloseModal}>
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.handleEdit(this.state.editCarId, {
                model: this.state.model,
                make: this.state.make,
                owner: this.state.owner,
                registration: this.state.registration,
                address: this.state.address
              })}
            >
              Apply Changes
            </button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.olderThanFiveYears.length > 0} onHide={this.handleCloseOlderThanFiveYears}>
  <Modal.Header closeButton>
    <Modal.Title>Cars Older Than 5 Years</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <ul>
      {this.state.olderThanFiveYears.map(car => (
        <li key={car._id}>{car.make} {car.model} {car.owner} {car.registration} {car.address}</li>
      ))}
    </ul>
  </Modal.Body>
  <Modal.Footer>
    <button className="btn btn-secondary" onClick={this.handleCloseOlderThanFiveYears}>
      Close
    </button>
  </Modal.Footer>
</Modal>


      </div>
    );
  }
}

export default App;
