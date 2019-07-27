import React, { Component } from 'react';

class Result extends Component {

    render() {
        return (
            <div className="result">
                <div className="flexContainer" onClick={() => window.open(this.props.metadata.link, "_blank")}>
                        <div className="coverArt">
                            <img src={this.props.metadata.imageSource} alt="playlist cover art"></img>
                        </div>
                        <div className="playlistInfo">
                            <p className="playlistTitle">{this.props.metadata.title}</p>
                            <a href={this.props.metadata.authorLink} target="_blank">{this.props.metadata.authorName}</a>
                        </div>
                        <div className="songCount">
                                <p className="count">{this.props.metadata.songCount}</p>
                                <p>songs</p>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Result;