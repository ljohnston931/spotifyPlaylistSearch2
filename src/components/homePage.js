import React, { Component } from 'react';
import Results from './results.js';
import FormGrid from './formGrid.js';
import Modal from './modal.js';
import './modal.css';
import ReactGA from 'react-ga';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setResults = this.setResults.bind(this);

        ReactGA.initialize('UA-146064976-1');
        ReactGA.pageview('homepage');
    }

    setResults(results) {
        this.setState({ results: results });
    }

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    openModal = (modalHeader, modalContent) => {
        this.setState({ isModalOpen: true, modalHeader: modalHeader, modalContent: modalContent });
        ReactGA.modalview(modalHeader);
    };

    render() {
        return (
            <div>
                <div className="heading">
                    <p className="title">DISCOVER YOUR SPOTIFY SOULMATE</p>
                    <p className="subtitle">FIND A SPOTIFY USER WHOSE TASTE IS AS GOOD AS YOURS.</p>
                </div>
                <FormGrid setResults={this.setResults} openModal={this.openModal} />
                <Results results={this.state.results} openModal={this.openModal} />
                <Modal
                    modalClosed={this.closeModal}
                    show={this.state.isModalOpen}
                    modalTitle={this.state.modalHeader}
                    useModalHeader={true}
                    useModalFooter={false}
                >
                    {this.state.modalContent}
            </Modal>
          </div>
        )
  }
}

export default HomePage;