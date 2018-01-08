import React, {Component} from 'react';

class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
        bgColor: '',
        user: this.props.user
    };
  }

  componentWillMount() {
    this.renderUser(this.props.user);
  }

  componentWillReceiveProps(nxt) {
    const { user } = this.props;

    if (nxt.user !== user) {
      this.setState({ user: nxt.user }, () => {
          this.renderUser(nxt.user);
      });
    }
  }

  renderUser = (user) => {
    switch(user.priority) {
      case 1:
        this.setState({
            bgColor: 'orange'
        });
        break;
      case 2:
        this.setState({
            bgColor: 'green'
        });
        break;
      case 3:
        this.setState({
            bgColor: 'blue'
        });
        break;
      case 4:
        this.setState({
            bgColor: 'purple'
        });
        break;
    }
  }

  render() {
    const { user } = this.props;

    return (
      <div className="col-sm-4 user-container">
        <div className={`user-wrapper ${this.state.bgColor}`}>
          <h2>{user.name}</h2>
          <span className="age">{user.age}</span>
          <span className="category">{user.category}</span>
        </div>
      </div>
    )
  }
}

export default User;
