/* 
  Child component to display list of commits
*/
import React, { Component } from 'react';
import './App.css';
import Modal from 'react-bootstrap/lib/Modal';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as moment from 'moment';


export interface CommitDetailProps {
	show: boolean;
	commits: any;
}

export default class CommitDetail extends Component<CommitDetailProps, any> {

  constructor(props) {
    super(props);
    this.state = {
    	show: this.props.show || false,
    	commits: this.props.commits || [],
    };
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  	this.setState({
  		show: nextProps.show,
  		commits: nextProps.commits
  	});
  }

  handleClose() {
  	this.setState({ show: false });
  }

  shaColFormatter = (cell, row) => {
  	let link = `${row.html_url}`
  	return (
      <a href={link}>
      	{cell}
      </a>
  	);
  }

  renderTable() {
	let items = [];
	this.state.commits.map((object) => {
  		items.push({sha: object.sha, author: object.commit.author.name, date: moment(object.commit.author.date).format('MMM D, YYYY'), html_url: object.html_url});
	});

	return (
	  <BootstrapTable data={items} condensed striped pagination>
        <TableHeaderColumn ref='url' dataFormat={this.shaColFormatter} dataField="sha" isKey={true}  tdStyle={ { whiteSpace: 'normal', cursor: 'pointer' } } thStyle={ { whiteSpace: 'normal' } }>Sha</TableHeaderColumn>
        <TableHeaderColumn dataField="author" dataSort={true} tdStyle={ { whiteSpace: 'normal', cursor: 'pointer' } } thStyle={ { whiteSpace: 'normal' } }>Author</TableHeaderColumn>
        <TableHeaderColumn dataField="date" dataSort={true}>Date</TableHeaderColumn>
      </BootstrapTable>
    );  
  }

  render() {
    return (
  	  <div>
  		<Modal className="right fade" id="commit-modal" bsSize="large" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Commits</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderTable()}
          </Modal.Body>
        </Modal>
	  </div>
  	);
  }

}
