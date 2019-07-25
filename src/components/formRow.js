import React, { Component } from 'react';

class FormRow extends Component {
    constructor(props) {
        super(props);
        this.state = { artist: '', song: '' };

        this.handleArtistChange = this.handleArtistChange.bind(this);
        this.handleSongChange = this.handleSongChange.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
    }

    handleArtistChange(event) {
        this.setState({ artist: event.target.value }, () => {
            this.onFormChange();
        });
    }

    handleSongChange(event) {
        this.setState({ song: event.target.value }, () => {
            this.onFormChange();
        });
    }

    onFormChange() {
        this.props.onEditForm(this.props.index, { artist: this.state.artist, song: this.state.song });
    }

    render() {
        return (
        <form>
            <label>
                Artist:
                <input type="text" value={this.state.artist} onChange={this.handleArtistChange} />
            </label>
            <label>
                Song:
                <input type="text" value={this.state.song} onChange={this.handleSongChange} />
            </label>
           </form>
        );
    }

}
export default FormRow;