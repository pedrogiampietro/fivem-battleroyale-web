import styled from 'styled-components';

interface TabProps {
	$isActive: boolean;
}
export const GroupSection = styled.section`
	position: relative;
	background: #11181c;
	border-top: 1px solid #34b27b;
	border-radius: 5px;
	padding: 0.9375rem 1.875rem 1.5625rem;
	margin-top: 33px;
	margin-bottom: 64px;
`;

export const TabsContainer = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	border-bottom: 1px solid #ccc;
`;
export const Tab = styled.button<TabProps>`
	padding: 0.5rem 1rem;
	border: none;
	font-size: 0.75rem;
	background: ${(props) =>
		props.$isActive
			? 'linear-gradient(91.48deg, #34b27b 0%, #248a5e 100%)'
			: '#11181c'};
	border-radius: 5px 5px 0px 0px;
	margin: 5px;
	width: auto;
	height: 26px;
	cursor: pointer;
	color: ${(props) => (props.$isActive ? '#fff' : '#757575')};

	&:hover {
		background: ${(props) =>
			props.$isActive
				? 'linear-gradient(91.48deg, #3dc98a 0%, #2a9e6a 100%)'
				: '#1a2329'};
	}
`;

export const ContentContainer = styled.div`
	padding: 1rem;
`;

export const InventoryGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
	gap: 10px;
	padding: 20px;

	@media (max-width: 1024px) {
		grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
	}

	@media (max-width: 768px) {
		grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
	}

	@media (max-width: 480px) {
		grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
	}
`;

export const InventorySlot = styled.div`
	background: #1a2329;
	border: 1px solid rgba(52, 178, 123, 0.15);
	padding: 10px;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	border-radius: 5px;
`;

export const ItemName = styled.span`
	color: white;
	margin-top: 10px;
`;
export const ItemImage = styled.img`
	width: 50px;
	height: 50px;
`;
