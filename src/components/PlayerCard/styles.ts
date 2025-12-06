import styled from 'styled-components';

export const CardContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 1rem;
	justify-content: center;
`;

export const Card = styled.div`
	background: #11181c;
	border-radius: 5px;
	border: 1px solid rgba(52, 178, 123, 0.2);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 280px;
	margin: 1rem;
	position: relative;
	width: 370px;
	overflow: hidden;
	padding: 1rem; // adiciona um padding ao card para espaçar o conteúdo das bordas

	&::before {
		content: '';
		inset: -1px;
		z-index: -1;
		position: absolute;
		border-radius: 6px;
		background: linear-gradient(
			181.46deg,
			rgba(52, 178, 123, 0) 63.79%,
			rgba(52, 178, 123, 0.3) 98.78%
		);
	}
`;

export const CardImage = styled.img`
	width: 100%;
	height: 155px;
	border-radius: 5px 5px 0px 0px;
	object-fit: cover;
	margin-bottom: 0.75rem; // adiciona uma margem abaixo da imagem para espaçar do texto
`;

export const MatchmakingTitle = styled.strong`
	font-size: 1.3125rem;
	border-bottom: 1px solid rgb(63, 63, 70);
	width: 100%;
	font-weight: 700;
	padding-bottom: 0.75rem;
	text-align: center; // centraliza o texto
`;

export const MatchmakingInfo = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 1rem;
`;

export const InfoPair = styled.div`
	display: flex;
	flex-direction: column;
`;

export const InfoLabel = styled.span`
	font-size: 10px;
	color: rgb(161, 161, 170);
	letter-spacing: 0.066px;
`;

export const InfoData = styled.p`
	font-size: 12px;
	font-weight: 600;
	color: rgb(212, 212, 216);
`;

export const Button = styled.button`
	color: rgb(250, 250, 250);
	position: relative;
	border: none;
	transition: all 0.4s ease 0s;
	background: linear-gradient(
		91.48deg,
		#34b27b 0%,
		#248a5e 100%
	);
	font-size: 0.75rem;
	padding: 0.6rem 0.5rem;
	letter-spacing: 0.066px;
	line-height: 13px;
	border-radius: 5px;
	font-weight: 600;
	cursor: pointer;
	&:hover {
		background: linear-gradient(
			91.48deg,
			#3dc98a 0%,
			#2a9e6a 100%
		);
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.6;
		background: rgba(36, 138, 94, 0.6);
	}

	&:hover:enabled {
		background: linear-gradient(
			91.48deg,
			#3dc98a 0%,
			#2a9e6a 100%
		);
	}
`;
