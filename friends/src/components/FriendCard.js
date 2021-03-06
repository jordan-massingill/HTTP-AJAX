import React from 'react';
import FriendForm from './FriendForm.js';
import Friend from './Friend.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

class FriendCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      friend: null,
      name: '',
      age: '',
      email: ''
    }
  }

  componentDidMount= () => {
    const id = this.props.match.params.id;
    this.fetchFriend(id);
    console.log(id);
  }

  fetchFriend = idnum => {
    axios
      .get(`http://localhost:5000/friends`)
      .then(response => {
        const friend = response.data.find(item => item.id === parseInt(idnum));
        this.setState(() => ({ friend }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  addValueHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  changeFriendHandler = (e) => {
    const changedfriend = {
      id: this.state.friend.id,
      name: this.state.name,
      age: this.state.age,
      email: this.state.email
    };
    axios.put(`http://localhost:5000/friends/${changedfriend.id}`, changedfriend)
    .then(response => {
      this.props.reSetState();
    })
    .catch(error => {
      console.error(error);
    });
  }

  deleteFriendHandler = () => {
    axios.delete(`http://localhost:5000/friends/${this.state.friend.id}`)
    .then(response => {
      this.props.reSetState();
    })
    .catch(error => {
      console.error(error);
    });
  }

  render () {
    if (!this.state.friend) {
      return (
        <div>Server Error!</div>
      )
    }
    return (
      <div>
        <FriendForm submitFriend={this.changeFriendHandler} newFriendName={this.state.name} valueAdd={this.addValueHandler} newFriendAge={this.state.age} newFriendEmail={this.state.email} />
        <Friend person={this.state.friend} />
        <Link to='/'>
          <button onClick={this.deleteFriendHandler}>Delete Friend</button>
          <button>Back to Home</button>
        </Link>
      </div>
    )
  }
}

export default FriendCard;
