import React from 'react';

const MESSAGE_OPERATIONS = ['back', 'bday', 'blackadder', 'bm', 'bus', 'chainsaw', 'cocksplat', 'dalton', 'deraadt', 'donut', 'gfy', 'ing', 'keep', 'king', 'linus', 'look', 'madison', 'nugget', 'off', 'outside', 'problem', 'shakespeare', 'shutup', 'think', 'thinking', 'thumbs', 'xmas', 'yoda', 'you'];
const NAMES = ['Jasmine', 'Mathias', 'Angel', 'Davon', 'Sonny', 'Rhys', 'Jazlyn', 'Ellie', 'Olive', 'Sage', 'Braylon', 'Colt', 'Charlotte', 'Alexander', 'Jaydon', 'Davion', 'Abel', 'Parker', 'Arianna', 'Mohammad', 'Nathaniel', 'Elle', 'Abdiel', 'Ryleigh', 'Deborah', 'Justice', 'Jayson', 'Emerson', 'Azul', 'Georgia', 'Isabelle', 'Monserrat', 'Janessa', 'Rogelio', 'Destiney', 'Alessandra', 'Xavier', 'Bridger', 'Joyce', 'Dulce', 'Justin', 'Jackson', 'Eve', 'Zachary', 'Alivia', 'Selena', 'Gloria', 'Jenna', 'Chace', 'Kasey', 'Dominik', 'Laila', 'Shyla', 'Rory', 'Kaden', 'Maximo', 'Scott', 'Ingrid', 'Niko', 'Rosemary', 'Bruce', 'Davin', 'Judith', 'Guillermo', 'Zaria', 'Jon', 'Edward', 'Milo', 'Estrella', 'Shania', 'Andrea', 'Maryjane', 'Savion', 'Carl', 'Yasmin', 'Kellen', 'Clarence', 'Corinne', 'Madeleine', 'Areli', 'Sergio', 'Lesly', 'Pamela', 'Yadiel', 'Aria', 'Essence', 'Isaac', 'Zavier', 'Ayden', 'Rey', 'Randall', 'Anderson', 'Raul', 'Hugh', 'Leonidas', 'Jonah', 'Brooke', 'Adonis', 'Jovanni', 'Cassie'];

const randomIntFromRange = function(lower, higher){
  // given lower and higher are integers
  // return x where lower <= x < higher
  return Math.floor(Math.random() * (higher - lower) + lower);
};

const upperCaseFirstLetter = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      recipient: 'whatever your name is',
      message: '',
      subtitle: ''
    }
  }

  componentDidMount() {
    this.generateRandomMessage();
  }

  handleChange = (e) => {
    const name = e.target.value;
    this.setState({
      recipient: name !== '' ? name : 'whatever your name is'
    })
  }

  getNewMessage = (e) => {
    e.preventDefault();
    this.generateRandomMessage();
  }

  generateRandomMessage = () => {
    let messageOperation = MESSAGE_OPERATIONS[randomIntFromRange(0, MESSAGE_OPERATIONS.length)]; // get random operation
    let from = NAMES[randomIntFromRange(0, NAMES.length)]; // get random name
    let recipient = this.state.recipient;

    let serviceURL = `http://foaas.com/${messageOperation}/${recipient}/${from}`;
    console.log(serviceURL);

    let request = new Request(serviceURL, {
      headers: new Headers({
        'Accept': 'application/json'
      })
    });

    fetch(request)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const {message, subtitle} = json;
        this.setState({
          message: upperCaseFirstLetter(message),
          subtitle
        })
      });
  }

  render() {
    const { message, subtitle } = this.state;
    return (
      <div>
        <header className="text-center">
          <h1 className="py-4">Rude Messages from Random People</h1>
          <div className="mx-2 pb-2 mb-4">
            <p>Not for the faint-hearted.</p>
          </div>
        </header>
        <div className="container p-3">
          <form onSubmit={this.getNewMessage}>
            <div className="form-group input-group">
              <input type="text" className='form-control' placeholder="What's your name?" onChange={this.handleChange} />
              <span className='input-group-btn'>
                <button type='submit' className='btn btn-primary'>Hit me baby!</button>
              </span>
            </div>
          </form>
        </div>
        <div className='container'>
          <div className='jumbotron'>
            <h2>{message}</h2>
            <p><em>{subtitle}</em></p>
          </div>
        </div>
      </div>
    )
  }
}