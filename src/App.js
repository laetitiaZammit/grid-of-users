import React, {Component} from 'react';
import { Select, Radio } from 'antd';
import { users } from './data';
import User from './User';

const Option = Select.Option;
const RadioGroup = Radio.Group;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      featuredUsers: users,
      listUsers: users,
      filterValue: 'all',
      sortingValue: 'featured',
      noResultVisible: false
    };
  }

  //this function will be called anytime the user will sort the list using the Select
  handleFiltering = (e) => {
    const { featuredUsers, sortingValue } = this.state;

    this.setState({ filterValue: e.target.value }, () => {
      if (e.target.value === 'all') {
        this.setState({ noResultVisible: false, listUsers: featuredUsers }, () => {
            this.handleSorting(sortingValue);
        });
      } else {
        // Removing any user that is not corresponding to the chosen category
        let filteredArr = featuredUsers.filter(user => user.category === e.target.value);

        // if no results from filtering, then show no result message
        if (filteredArr.length === 0) {
          this.setState({
            noResultVisible: true
          });
        } else {
          this.setState({
            noResultVisible: false
          });
        }

        // update the list of users
        this.setState({ listUsers: filteredArr }, () => {
          //call the sorting handler function to make sure even our new list correspond to the type of sorting the user have selected
          this.handleSorting(sortingValue);
        });
      }
    });
  }

  //this function will be called anytime the user will sort the list using the Select
  // and also when the user is filtering in order to have a list that reflects the sorting tool
  handleSorting = (value) => {
    const { listUsers, featuredUsers, filterValue, sortingValue } = this.state;

    this.setState({ sortingValue: value }, () => {
      if (value === 'featured') {
        this.setState({
            listUsers: filterValue === 'all' ? featuredUsers : featuredUsers.filter(user => user.category === filterValue)
        });
      }

      if (value === 'aToZ') {
        //I am using slice to avoid array mutation
        let sortedList = listUsers.slice().sort((user1, user2) => {return user1.name > user2.name});
        this.setState({
            listUsers: sortedList
        });
      }

      if (value === 'priority') {
        //I am using slice to avoid array mutation
        let sortedList = listUsers.slice().sort((user1, user2) => {return user1.priority > user2.priority});
        this.setState({
            listUsers: sortedList
        });
      }
    });

  }

  render() {
    const { listUsers, noResultVisible } = this.state;

    return (
      <div className="container">
        <h1>Grid of Users Page</h1>
        <div className="filters">
          <div className="row">
            <div className="col-sm-4">
              <h3>Sorting</h3>
              <Select defaultValue="featured" style={{ width: 250 }} onChange={this.handleSorting}>
                <Option value="featured">Featured</Option>
                <Option value="aToZ">A­Z</Option>
                <Option value="priority">Priority</Option>
              </Select>
            </div>
            <div className="col-sm-8">
              <h3>Filtering by Category</h3>
              <RadioGroup onChange={this.handleFiltering} value={this.state.filterValue}>
                <Radio value="cat1">Category 1</Radio>
                <Radio value="cat2">Category 2</Radio>
                <Radio value="cat3">Category 3</Radio>
                <Radio value="cat4">Category 4</Radio>
                <Radio value="all">All Categories</Radio>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="wrapper">
          <div className="row">
            {listUsers.map((user, i) => {
              return (
                <User key={`user-${i}`}  user={user} />
              )
            })}
            {noResultVisible &&
              <div className="col-sm-12 no-result">
                <p>There is no user corresponding to this category</p>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
export default App;
