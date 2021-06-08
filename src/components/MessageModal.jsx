const MessageModal = ({Message, CloseModal, OpenedModal}) => {
    return (
        <>
        <div className={`modal ${OpenedModal ? 'show' : 'hide'}`}>
            <div className="modal-content">
                <p>{Message}</p>
                <button className="default-button" onClick={CloseModal}>Close</button>
            </div>
        </div>
        </>
    )
}

export default MessageModal;