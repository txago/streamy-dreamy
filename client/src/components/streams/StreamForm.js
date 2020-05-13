import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return <small className='form-text text-danger'>{error}</small>;
		}
	}

	renderInput = ({ input, label, meta }) => {
		return (
			<div className='form-group'>
				<label htmlFor={input}>{label}</label>
				<input
					{...input}
					type='text'
					className='form-control form-control-lg'
				/>{' '}
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<Field name='title' label='Enter title' component={this.renderInput} />
				<Field
					name='description'
					label='Enter description'
					component={this.renderInput}
				/>
				<button className='btn btn-primary'>Submit</button>
			</form>
		);
	}
}

const validate = (formValues) => {
	const errors = {};

	if (!formValues.title) {
		errors.title = 'You must enter a title.';
	}

	if (!formValues.description) {
		errors.description = 'You must enter a description.';
	}

	return errors;
};

export default reduxForm({
	form: 'streamForm',
	validate,
})(StreamForm);
