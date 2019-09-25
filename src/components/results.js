import React, { Component } from 'react';
import Result from './result.js';
import GetResultsButton from './getResultsButton.js'

class Results extends Component {

    openAdvertiseModal() {
        const form =
            <form className="modalForm" method="POST" action="https://formspree.io/ljohnston931@gmail.com">
                <textarea name="message" placeholder="Message"></textarea>
                <input type="email" name="email" placeholder="Your email"></input>
                <button className="pill" type="submit">Email Me</button>
            </form>;
        this.props.openModal("CONTACT ME", form);
    }

    render() {
        if (this.props.results) {
            // if (error) sorry I only get 100 searches a day before google starts charging me money. Try again tomorrow!
            const message = this.props.results.message;
            const nextPageUrl = this.props.results.nextPageUrl;
            const baseUrl = this.props.results.baseUrl
            let results;
            if (this.props.results.items) {
                results = this.props.results.items.map((result, index) =>
                    <Result metadata={result} key={index} openModal={this.props.openModal}/>);
            }

            return (
                <div>
                    <p>{message}</p>
                    <div className="pill" onClick={() => this.openAdvertiseModal()}>Advertise your playlist here!</div>
                    <div>{results}</div>
                    <GetResultsButton addNewResults={this.props.addNewResults} nextPageUrl={nextPageUrl} baseUrl={baseUrl}>More</GetResultsButton>
                </div>
            );
        } else {
            return (null);
        }
    }
}

export default Results;