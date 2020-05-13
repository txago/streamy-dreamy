import React from 'react';
import { connect } from 'react-redux';

import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
	onSubmit = (formValues) => {
		this.props.createStream(formValues);
	};

	render() {
		return (
			<div className='row justify-content-center my-4'>
				<div className='col-sm-12 col-md-6'>
					<h1 className='mb-4'>Create new stream</h1>
					<StreamForm onSubmit={this.onSubmit} />
				</div>
			</div>
		);
	}
}

export default connect(null, { createStream })(StreamCreate);
