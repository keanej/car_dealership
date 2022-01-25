// Car Class: Represents a Car
class Car{
  constructor(make, model, color, engine, fuel, registration) {
    this.make = make;
    this.model = model;
    this.color = color;
    this.engine = engine;
    this.fuel = fuel;
    this.registration = registration;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayCars() {
    const cars = Store.getCars();

    cars.forEach((car) => UI.addCarToList(car));
  }

  static addCarToList(car) {
    const list = document.querySelector('#car-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${car.make}</td>
      <td>${car.model}</td>
      <td>${car.color}</td>
      <td>${car.engine}</td>
      <td>${car.fuel}</td>
      <td>${car.registration}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteCar(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#car-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(),
    3000);
  }

  static clearFields() {
    document.querySelector('#make').value = '';
    document.querySelector('#model').value = '';
    document.querySelector('#color').value = '';
    document.querySelector('#engine').value = '';
    document.querySelector('#fuel').value = '';
    document.querySelector('#registration').value = '';
  }
}


// Store Class: Handles Storage
class Store {
  static getCars() {
    let cars;
    if(localStorage.getItem('cars') === null) {
      cars = [];
    } else {
      cars = JSON.parse(localStorage.getItem('cars'));
    }

    return cars;
  }

  static addCar(car) {
    const cars = Store.getCars();
    cars.push(car);
    localStorage.setItem('cars', JSON.stringify(cars));
  }

  static removeCar(registration) {
    const cars = Store.getCars();

    cars.forEach((car, index) => {
      if(car.registration === registration) {
        cars.splice(index, 1);
      }
    });

    localStorage.setItem('cars', JSON.stringify(cars));
  }
}
 
// Event: Display Cars
document.querySelector('DOMContentLoaded', UI.displayCars);

// Event: Add a Car
document.querySelector('#car-form').addEventListener('submit', (e) => {

  // Prevent actual submit
  e.preventDefault();

  // Get from values
  const make = document.querySelector('#make').value;
  const model = document.querySelector('#model').value;
  const color = document.querySelector('#color').value;
  const engine = document.querySelector('#engine').value;
  const fuel = document.querySelector('#fuel').value;
  const registration = document.querySelector('#registration').value;

  // Validate
  if(make === '' || model === '' || color === '' || engine === '' || fuel === '' || registration === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instantiate car
    const car = new Car(make, model, color, engine, fuel, registration);

    // Add Car to UI
    UI.addCarToList(car);

    // Add car to store
    Store.addCar(car);

    // Show success message
    UI.showAlert('Car Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Car
document.querySelector('#car-list').addEventListener('click', (e) => {
  
  // Remove car from UI
  UI.deleteCar(e.target)

  // Remove car from store
  Store.removeCar
  (e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Car Removed', 'success');
});