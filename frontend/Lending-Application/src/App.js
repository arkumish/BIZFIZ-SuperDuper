import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";


import "./App.css";
import Form from "./Form";

import ConfirmationScreen from "./ConfirmationScreen";
import NavBar from "./NavBar";


const invertDirection = {
  asc: "desc",
  desc: "asc"
};

const CONFIRM_STATE = "ConfirmState"

class App extends Component {
  state = {
    data: [
      {
        firstName: "Tann",
        lastName: "Gounin",
        username: "tgounin0",
        email: "tgounin0@wordpress.com",
        passsword: "yJG2MuL5piY"
      }
    ],
    submittedData: {},
    editIdx: -1,
    columnToSort: "",
    sortDirection: "desc",
    query: "",
    columnToQuery: "firstName",
    whichPage: "",
    userId: 0
  };

  componentDidMount() {
    let conf = "/confirmscreen/";
    const path = window.location.pathname;
    if(path.includes(conf)) {
      this.setState(state => ({
        showPage: CONFIRM_STATE
      }));
      let userId = path.replace(conf,'');
      this.state.userId = userId.slice(0,24);
    }
  };

  handleRemove = i => {
    this.setState(state => ({
      data: state.data.filter((row, j) => j !== i)
    }));
  };

  startEditing = i => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleSave = (i, x) => {
    this.setState(state => ({
      data: state.data.map((row, j) => (j === i ? x : row))
    }));
    this.stopEditing();
  };

  handleSort = columnName => {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection:
        state.columnToSort === columnName
          ? invertDirection[state.sortDirection]
          : "asc"
    }));
  };

  render() {
    const lowerCaseQuery = this.state.query.toLowerCase();
    return (
      <MuiThemeProvider>
        <div className="App">
        
          <NavBar title={"Apply for Business Loans"} />
          {this.state.showPage !== CONFIRM_STATE ?  (<Form
            onSubmit={(submission) => {
              this.setState({
                data: [...this.state.data, submission],
                submittedData: submission
              })
            }
            }
          />) : <ConfirmationScreen userId={this.state.userId} />} 
          {/* <div style={{ display: "flex" }}>
            <div style={{ display: "flex", margin: "auto" }}>
              <TextField
                hintText="Query"
                floatingLabelText="Query"
                value={this.state.query}
                onChange={e => this.setState({ query: e.target.value })}
                floatingLabelFixed
              />
              <SelectField
                style={{ marginLeft: "1em" }}
                floatingLabelText="Select a column"
                value={this.state.columnToQuery}
                onChange={(event, index, value) =>
                  this.setState({ columnToQuery: value })
                }
              >
                <MenuItem value="firstName" primaryText="First Name" />
                <MenuItem value="lastName" primaryText="Last Name" />
                <MenuItem value="username" primaryText="Username" />
                <MenuItem value="email" primaryText="Email" />
              </SelectField>
            </div>
          </div>
          <Table
            handleSort={this.handleSort}
            handleRemove={this.handleRemove}
            startEditing={this.startEditing}
            editIdx={this.state.editIdx}
            stopEditing={this.stopEditing}
            handleSave={this.handleSave}
            columnToSort={this.state.columnToSort}
            sortDirection={this.state.sortDirection}
            data={orderBy(
              this.state.query
                ? this.state.data.filter(x =>
                    x[this.state.columnToQuery]
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                : this.state.data,
              this.state.columnToSort,
              this.state.sortDirection
            )}
            header={[
              {
                name: "First name",
                prop: "firstName"
              },
              {
                name: "Last name",
                prop: "lastName"
              },
              {
                name: "Username",
                prop: "username"
              },
              {
                name: "Email",
                prop: "email"
              }
            ]}
          /> */}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
