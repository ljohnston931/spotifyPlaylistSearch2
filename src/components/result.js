import React, { Component } from 'react';
import ReactGA from 'react-ga';

class Result extends Component {
    constructor(props) {
        super(props);
        this.copyUri = this.copyUri.bind(this);
        this.openCopyUriModal = this.openCopyUriModal.bind(this);
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
        ReactGA.event({
            category: 'Copy URI',
            action: 'Click',
            label: this.props.metadata.spotifyUri
        });
    }

    openCopyUriModal() {
        const message =
            <div>
                <span>Instead of opening a playlist in the Spotify Web Player, you can open it directly in the Spotify app.</span><br/>
                    <span>Paste the Spotify URI into the search bar of the Spotify app and press enter.</span>
             </div>;
      this.props.openModal('SPOTIFY URI', message);
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
                            <div onClick={this.copyUri}>
                                <p className="changeOnHover footnote">Copy Spotify URI</p>
                                <i class="changeOnHover fa fa-question-circle" aria-hidden="true" onClick={this.openCopyUriModal}></i>
                            </div>
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