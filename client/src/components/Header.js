import React from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth';

const Header = () => {
	return (
		<nav className='navbar navbar-expand-xs navbar-dark bg-dark'>
			<Link to='/' className='navbar-brand'>
				StreamyDreamy
			</Link>
			<ul className='navbar-nav'>
				<li className='nav-item'>
					<Link to='/' className='nav-link'>
						All streams
					</Link>
				</li>
			</ul>
			<div className='div-inline'>
				<GoogleAuth />
			</div>
		</nav>
	);
};

export default Header;
