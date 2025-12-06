import styled from 'styled-components';

interface BannerProps {
	background: string;
}

export const CenteredContainer = styled.div`
	width: 100%;
	max-width: 76.25rem;
	margin: -50px auto 30px;
	z-index: 2;
	position: relative;
	padding: 0px 1rem;
	display: flex;
	flex-direction: column;
`;

export const Banner = styled.div<BannerProps>`
	width: 100%;
	height: 45rem;
	position: relative;
	background: 
		linear-gradient(360deg, #11181c 0%, rgba(17, 24, 28, 0.8) 15%, rgba(0, 0, 0, 0) 50%),
		url(${(props) => props.background});
	background-size: cover;
	background-position: center top;
	background-repeat: no-repeat;
	
	@media (max-width: 1400px) {
		height: 38rem;
	}
	
	@media (max-width: 1024px) {
		height: 32rem;
	}
	
	@media (max-width: 768px) {
		height: 25rem;
	}
`;
