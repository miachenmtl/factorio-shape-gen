import { h } from 'preact';

import Header from './sections/Header';
import Main from './sections/Main';
import Footer from './sections/Footer';

import './style.css';

export default function App() {
	return (
		<div>
			<Header />
			<Main />
			<Footer />
		</div>
	);
}