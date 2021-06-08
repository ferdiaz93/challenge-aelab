const MessageModal = ({Message, CloseModal}) => {
    return (
        <>
        <div className="modal">
            <div className="modal-content">
                <p>{Message}</p>
                <button class="default-button" onClick={CloseModal}>Close</button>
            </div>
        </div>
        </>
    )
}

export default MessageModal;