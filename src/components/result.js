import React, { Component } from 'react';

class Result extends Component {
    constructor(props) {
        super(props);
        this.copyUri = this.copyUri.bind(this);
    }
            
    copyUri(event) {
        event.stopPropagation();
        let textArea = document.createElement('textarea');
        textArea.style.opacity = 0;
        textArea.style.height = '0px';
        textArea.value = this.props.metadata.spotifyUri;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
}

    render() {
        return (
            <div className="result">
                <div className="flexContainer" onClick={() => window.open(this.props.metadata.link, "_blank")}>
                        <div className="coverArt">
                            <img src={this.props.metadata.imageSource} alt="playlist cover art"></img>
                        </div>
                        <div className="playlistInfo">
                            <p>{this.props.metadata.title}</p>
                            <a href={this.props.metadata.authorLink} target="_blank"><p className="changeOnHover">{this.props.metadata.authorName}</p></a>
                            <div onClick={this.copyUri}><p className="changeOnHover footnote">Copy Spotify URI</p></div>
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