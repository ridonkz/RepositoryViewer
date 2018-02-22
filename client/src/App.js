import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import CommitList from './CommitList';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { ClipLoader } from 'react-spinners';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      repositories: [],
      commits: [],
      show: false,
      loading: true
    };
  }  

  componentDidMount() {
    this.listGitRepository()
      .then(res => this.setState({ repositories: res }))
      .catch(err => console.log(err));
  }

  listGitRepository = async () => {
    const response = await fetch('/api/list-repos');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };


  getCommits = async (e) => {
    const response = await fetch(`/api/commits/${e.name}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleClick = (rows) => {
    this.getCommits(rows)
      .then(res => this.setState({ commits: res, show:true }))
      .catch(err => console.log(err));
  }

  sortRepository() {
    this.state.repositories.sort(function (a, b) {
      return b.forks_count - a.forks_count;
    });
  }

  renderList() {
    this.sortRepository();
    const options = {
      onRowClick: this.handleClick
    };
    let items = [];
    this.state.repositories.map((object) => {
      items.push({name: object.name, description: object.description, forks: object.forks_count});
    });
    return (
      <BootstrapTable data={items} condensed hover pagination options={ options }>
        <TableHeaderColumn dataField="name" isKey={true} dataSort={true} tdStyle={ { cursor: 'pointer' } }>Name</TableHeaderColumn>
        <TableHeaderColumn dataField="description" tdStyle={ { whiteSpace: 'normal', cursor: 'pointer' } } thStyle={ { whiteSpace: 'normal' } }>Description</TableHeaderColumn>
        <TableHeaderColumn dataField="forks" dataSort={true} tdStyle={ { cursor: 'pointer' } }><Glyphicon glyph="cutlery" /> Forks</TableHeaderColumn>
      </BootstrapTable>
    );
  }

  renderLoader() {
    return (
        <ClipLoader
          color={'040404'} 
          loading={this.state.loading} />
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Netflix Repositories</h1>
        </header>
        {(this.state.repositories.length === 0 ) ? this.renderLoader() : this.renderList()}
        <CommitList ref={(ref) => this.commitList = ref} 
          show={this.state.show}
          commits={this.state.commits} />
      </div>
    );
  }
}

