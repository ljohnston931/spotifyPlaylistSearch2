import React, { Component } from 'react';

class Result extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="result">
                <a href={this.props.metadata.link}>
                    <div className="flexContainer">
                        <div className="coverArt">
                            <img src={this.props.metadata.imageSource}></img>
                        </div>
                        <div className="playlistInfo">
                            <p>{this.props.metadata.title}</p>
                            <a href={this.props.metadata.authorLink}>{this.props.metadata.authorName}</a>
                        </div>
                        <div className="songCount">
                            <div className="songCountInner">
                                <span className="count">{this.props.metadata.songCount}</span>
                                <span>songs</span>
                            </div>
                        </div>
                    </div>
                </a>

            </div>
        );
    }
}

export default Result;