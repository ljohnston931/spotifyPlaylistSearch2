import React, { PureComponent, Component, createRef } from 'react';

class Modal extends PureComponent {
    modalWrapper = createRef();

    renderHeader = () => {
        const { useModalHeader, modalTitle, modalClosed } = this.props;
        const headerMarkup = (
            <div className="modal-header">
                <h4 className="modal-title">{modalTitle}</h4>
                <button className="close-modal" onClick={modalClosed}>
                    X
        </button>
            </div>
        );

        if (useModalHeader === false) {
            return;
        }
        return headerMarkup;
    };

    renderFooter = () => {
        const {
      useModalFooter,
            modalClosed,
            footerBtnText,
            footerBtnListener
    } = this.props;

        const footerMarkup = (
            <div className="modal-footer">
                <button
                    className="close-modal"
                    onClick={() => {
                        if (footerBtnListener) {
                            footerBtnListener();
                        }
                        modalClosed();
                    }}
                >
                    {footerBtnText ? footerBtnText : "close"}
                </button>
            </div>
        );

        if (useModalFooter === false) {
            return;
        }
        return footerMarkup;
    };

    render() {
        const { show, modalClosed, children } = this.props;

        return (
            <div
                className={`modal-window ${!show ? "inactive-modal" : ""}`}
                onClick={e => {
                    if (e.target === this.modalWrapper.current) {
                        modalClosed();
                    }
                }}
            >
                <div className="modal-wrapper" ref={this.modalWrapper}>
                    <div className={`modal ${show ? "animate-modal" : ""}`}>
                        {this.renderHeader()}
                        <div className="modal-body">{children}</div>
                        {this.renderFooter()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
