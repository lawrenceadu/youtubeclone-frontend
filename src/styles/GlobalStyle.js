import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	html {
		font-size: 16px;
		box-sizing: border-box;
	}

	*, *:before, *:after {
		padding: 0;
		margin: 0;
		box-sizing: inherit;
	}

	body {
		font-size: 1rem;
		font-family: ${(props) => props.theme.font}, sans-serif;
		color: ${(props) => props.theme.primaryColor};
		background-color: ${(props) => props.theme.bg};
		line-height: 1.8;
	}

	h1, h2, h3, h4, h5, h6 {
		font-weight: normal;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	input, textarea {
		font-family: ${(props) => props.theme.font}, sans-serif;
		font-size: 1rem;
	}

	input:focus, textarea:focus, button:focus, video:focus {
			outline: none;
	}

	button {
		font-family: 'Fira Sans', sans-serif;
		font-size: 1rem;
		padding: 0px;
		height: 32px;
		padding: 0px 16px;
		background-color: #CC0000;
		border: none;
		color: #fff;
		border-radius: 3px;
		letter-spacing: 1.1px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	button:disabled {
		opacity: 0.65;
	}

	textarea {
		resize: none;
	}

	svg, .pointer {
		cursor: pointer;
	}

	.secondary {
		color: ${(props) => props.theme.secondaryColor};
	}

	.avatar {
		height: 22px;
		width: 22px;
		border-radius: 10px;
		object-fit: cover;
	}


	.md {
		height: 50px;
		width: 50px;
		border-radius: 25px;
	}

	.small {
		font-size: 0.9rem;
	}

	.lg {
		height: 60px;
		width: 60px;
		border-radius: 30px;
	}

	.d-flex {
		display: flex;
	}
	
	.flex-row {
		display: flex;
		align-items: center;
	}

	.flex-row img, .flex-row svg {
		margin-right: 0.8rem;
	}

	.ruler {
		height: 1px;
		background: ${(props) => props.theme.darkGrey};
		margin: 1rem 0;
	}

	.Toastify__toast {
		font-family: ${(props) => props.theme.font}, sans-serif;
		border-radius: 4px;
	}

	.Toastify__toast--error {
		background: ${(props) => props.theme.darkGrey};
	}

	.Toastify__toast--dark, .Toastify__toast--default {
		background: ${(props) => props.theme.purple};
    	color: #fff;
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus textarea:-webkit-autofill,
	textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
	select:-webkit-autofill,
	select:-webkit-autofill:hover,
	select:-webkit-autofill:focus {
	-webkit-box-shadow: 0 0 0 30px transparent inset !important;
	}

	/* clears the 'X' from Internet Explorer */
	input[type="search"]::-ms-clear,
	input[type="search"]::-ms-reveal {
	display: none;
	width: 0;
	height: 0;
	}

	/* clears the 'X' from Chrome */
	input[type="search"]::-webkit-search-decoration,
	input[type="search"]::-webkit-search-cancel-button,
	input[type="search"]::-webkit-search-results-button,
	input[type="search"]::-webkit-search-results-decoration {
	display: none;
	}

	select {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%239ba5b1"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>');
	background-position: right;
	background-repeat: no-repeat;
	background-size: 34px 24px;
	}

	@media screen and (max-width: 530px) {
		body {
			font-size: 0.95rem;
		}

		button {
			font-size: 0.9rem;
	  }
	}
`;

export default GlobalStyle;
