import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = (formValues) => {
		this.props.editStream(this.props.match.params.id, formValues);
	};

	render() {
		if (!this.props.stream) {
			return (
				<div className='row justify-content-center my-4'>
					<div className='col-sm-12 col-md-6'>
						<div className='spinner-border' role='status'>
							<span className='sr-only'>Loading...</span>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className='row justify-content-center my-4'>
				<div className='col-sm-12 col-md-6'>
					<h1 className='mb-4'>Edit stream</h1>
					<StreamForm
						initialValues={_.pick(this.props.stream, 'title', 'description')}
						onSubmit={this.onSubmit}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
	StreamEdit
);
