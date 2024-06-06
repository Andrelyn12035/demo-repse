interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal(props: ModalProps): ReturnType<React.FC> {
    return (
        <div className={`${"modal"} ${props.open ? "display-block" : "display-none"}`}>
            <div className="modal-main">
                <div className="modal-head">
                    <h1>Modal</h1>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
                <div className="btn-container">
                    <button type="button" className="btn" onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}