import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
	return ReactDOM.createPortal(
		<>
			<div
				onClick={props.onDismiss}
				className='modal'
				id='deleteModal'
				style={{ display: 'block' }}>
				<div
					onClick={(e) => e.stopPropagation()}
					className='modal-dialog modal-dialog-centered'
					role='document'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLongTitle'>
								{props.title}
							</h5>
							<button className='close' onClick={props.onDismiss}>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>
						<div className='modal-body'>{props.content}</div>
						<div className='modal-footer'>{props.actions}</div>
					</div>
				</div>
			</div>
			<div id='background' class='modal-backdrop show'></div>
		</>,
		document.querySelector('#modal')
	);
};

export default Modal;
