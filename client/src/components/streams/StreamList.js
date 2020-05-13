import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons';

class StreamList extends React.Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	renderAdmin(stream) {
		if (stream.userId === this.props.currentUserId) {
			return (
				<div>
					<Link
						to={`/streams/edit/${stream.id}`}
						className='btn btn-primary btn-sm btn-block'>
						Edit
					</Link>
					<Link
						to={`/streams/delete/${stream.id}`}
						className='btn btn-danger btn-sm btn-block'>
						Delete
					</Link>
				</div>
			);
		}
	}

	renderList() {
		return this.props.streams.map((stream) => {
			return (
				<li className='list-group-item' key={stream.id}>
					<div className='row no-gutters align-items-center'>
						<div className='col-2 text-center'>
							<FontAwesomeIcon
								icon={faSatelliteDish}
								style={{ fontSize: '48px' }}
							/>
						</div>
						<div className='col-8'>
							<div className='card-body'>
								<Link to={`/streams/${stream.id}`}>
									<h5 className='card-title'>{stream.title}</h5>
									<p className='card-text'>{stream.description}</p>
								</Link>
							</div>
						</div>
						<div className='col-2'>{this.renderAdmin(stream)}</div>
					</div>
				</li>
			);
		});
	}

	renderCreate() {
		if (this.props.isSignedIn) {
			return (
				<div>
					<Link to='/streams/new' className='btn btn-primary'>
						Create stream
					</Link>
				</div>
			);
		}
	}

	render() {
		return (
			<div className='row justify-content-center my-4'>
				<div className='col-sm-12 col-md-10'>
					<div className='d-flex justify-content-between'>
						<h1 className='mb-4'>All streams</h1>
						{this.renderCreate()}
					</div>
					<div className='card'>
						<ul className='list-group list-group-flush'>{this.renderList()}</ul>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn,
	};
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
