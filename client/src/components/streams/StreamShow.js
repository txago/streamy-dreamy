import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
	constructor(props) {
		super(props);

		this.videoRef = React.createRef();
	}

	componentDidMount() {
		const { id } = this.props.match.params;

		this.props.fetchStream(id);
		this.buildPlayer();
	}

	componentDidUpdate() {
		this.buildPlayer();
	}

	componentWillUnmount() {
		this.player.destroy();
	}

	buildPlayer() {
		const { id } = this.props.match.params;

		if (this.player || !this.props.stream) {
			return;
		}

		this.player = flv.createPlayer({
			type: 'flv',
			url: `http://localhost:8000/live/${id}.flv`,
		});
		this.player.attachMediaElement(this.videoRef.current);
		this.player.load();
	}

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

		const { title, description } = this.props.stream;

		return (
			<div className='row justify-content-center my-4'>
				<div className='col-sm-12 col-md-12 col-lg-10'>
					<h1 className='mb-4'>{title}</h1>
					<div className='embed-responsive embed-responsive-16by9'>
						<video
							ref={this.videoRef}
							controls
							className='embed-responsive-item'
						/>
					</div>
					<p className='my-4'>{description}</p>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
