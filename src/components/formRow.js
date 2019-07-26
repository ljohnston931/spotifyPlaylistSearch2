import React, { Component } from 'react';

class FormRow extends Component {
    constructor(props) {
        super(props);
        this.state = { artist: props.artist, song: props.song };

        this.handleArtistChange = this.handleArtistChange.bind(this);
        this.handleSongChange = this.handleSongChange.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
        this.onDelete = this.onDelete.bind(this);
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

    onDelete() {
        this.props.onDelete(this.props.index);
    }

    onFormChange() {
        this.props.onEditForm(this.props.index, { id: this.props.id, artist: this.state.artist, song: this.state.song });
    }

    render() {
        return (
            <div>
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
            <button onClick={this.onDelete}>X</button>
        </div>
        );
    }

}
export default FormRow;