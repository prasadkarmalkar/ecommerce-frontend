import React from 'react';
import './Loader.css';
function Loader() {
	return (
		<div className="loader">
			<div className="ring">
				Loading
				<span className="ring__span" />
			</div>
		</div>
	);
}

export default Loader;
