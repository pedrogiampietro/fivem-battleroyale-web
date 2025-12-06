import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { apiClient } from '../../services/api';
import { toast } from '../../lib/toast';
import { FaTshirt, FaHatCowboy, FaGlasses, FaShoePrints, FaVest, FaParachuteBox } from 'react-icons/fa';
import { GiArmoredPants, GiGloves, GiBracer } from 'react-icons/gi';

const tabs = [
	{ name: 'GERAL', icon: null },
	{ name: 'CAMISETA', icon: <FaTshirt /> },
	{ name: 'JAQUETA', icon: <FaVest /> },
	{ name: 'CHAPEU', icon: <FaHatCowboy /> },
	{ name: 'CALÇA', icon: <GiArmoredPants /> },
	{ name: 'LUVA', icon: <GiGloves /> },
	{ name: 'ÓCULOS', icon: <FaGlasses /> },
	{ name: 'ACESSÓRIO', icon: <GiBracer /> },
	{ name: 'CALÇADOS', icon: <FaShoePrints /> },
	{ name: 'COLETE', icon: <FaVest /> },
	{ name: 'PARAQUEDAS', icon: <FaParachuteBox /> },
];

// Mapeamento de categorias do frontend para os IDs do FiveM
const categoryToFiveM: Record<string, { componentId: number; isProp: boolean }> = {
	'CALÇA': { componentId: 4, isProp: false },
	'CAMISETA': { componentId: 8, isProp: false },
	'JAQUETA': { componentId: 11, isProp: false },
	'COLETE': { componentId: 9, isProp: false },
	'CALÇADOS': { componentId: 6, isProp: false },
	'ACESSÓRIO': { componentId: 7, isProp: false },
	'CHAPEU': { componentId: 0, isProp: true },
	'ÓCULOS': { componentId: 1, isProp: true },
	'LUVA': { componentId: 7, isProp: true },
};

// Itens de exemplo - em produção viriam da API
const defaultInventoryItems = [
	{ id: '1', name: 'Camiseta Básica', type: 'CAMISETA', itemId: 0, textureId: 0, image: 'https://via.placeholder.com/64', rarity: 'common' },
	{ id: '2', name: 'Camiseta Militar', type: 'CAMISETA', itemId: 15, textureId: 0, image: 'https://via.placeholder.com/64', rarity: 'rare' },
	{ id: '3', name: 'Jaqueta Tática', type: 'JAQUETA', itemId: 14, textureId: 0, image: 'https://via.placeholder.com/64', rarity: 'epic' },
	{ id: '4', name: 'Calça Cargo', type: 'CALÇA', itemId: 4, textureId: 0, image: 'https://via.placeholder.com/64', rarity: 'common' },
	{ id: '5', name: 'Calça Jeans', type: 'CALÇA', itemId: 1, textureId: 0, image: 'https://via.placeholder.com/64', rarity: 'common' },
	{ id: '6', name: 'Boné Preto', type: 'CHAPEU', itemId: 2, textureId: 0, image: 'https://via.placeholder.com/64', rarity: 'common' },
	{ id: '7', name: 'Capacete Militar', type: 'CHAPEU', itemId: 45, textureId: 0, image: 'https://via.placeholder.com/64', rarity: 'legendary' },
	{ id: '8', name: 'Óculos Aviador', type: 'ÓCULOS', itemId: 3, textureId: 0, image: 'https://via.placeholder.com/64', rarity: 'rare' },
	{ id: '9', name: 'Coturno Tático', type: 'CALÇADOS', itemId: 25, textureId: 0, image: 'https://via.placeholder.com/64', rarity: 'rare' },
	{ id: '10', name: 'Colete Balístico', type: 'COLETE', itemId: 11, textureId: 0, image: 'https://via.placeholder.com/64', rarity: 'epic' },
];

interface InventoryItem {
	id: string;
	name: string;
	type: string;
	itemId: number;
	textureId: number;
	image: string;
	rarity: string;
	equipped?: boolean;
}

const rarityColors: Record<string, string> = {
	common: '#a1a1aa',
	rare: '#3b82f6',
	epic: '#a855f7',
	legendary: '#f59e0b',
};

export const Inventory = () => {
	const [activeTab, setActiveTab] = useState('GERAL');
	const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(defaultInventoryItems);
	const [equippedItems, setEquippedItems] = useState<Record<string, string>>({});
	const [loading, setLoading] = useState(false);

	const userData = JSON.parse(localStorage.getItem('userData') || '{}');

	const handleTabClick = (tabName: string) => {
		setActiveTab(tabName);
	};

	const handleEquipItem = async (item: InventoryItem) => {
		if (!userData?.id) {
			toast.error('Você precisa estar logado para equipar itens.');
			return;
		}

		setLoading(true);
		try {
			await apiClient().post(`/appearance/user/${userData.id}/equip`, {
				category: item.type,
				itemId: item.itemId,
				textureId: item.textureId,
			});

			// Atualiza o estado local
			setEquippedItems(prev => ({
				...prev,
				[item.type]: item.id,
			}));

			toast.success(`${item.name} equipado! Será aplicado quando entrar no jogo.`);
		} catch (error) {
			console.error('Erro ao equipar item:', error);
			toast.error('Erro ao equipar item. Tente novamente.');
		} finally {
			setLoading(false);
		}
	};

	const isItemEquipped = (item: InventoryItem) => {
		return equippedItems[item.type] === item.id;
	};

	const filteredItems = inventoryItems.filter(
		(item) => activeTab === 'GERAL' || item.type === activeTab
	);

	return (
		<S.GroupSection>
			<S.ContentContainer>
				<S.InventoryHeader>
					<h2>MEU INVENTÁRIO</h2>
					<S.InventoryInfo>
						<span>{inventoryItems.length} itens</span>
					</S.InventoryInfo>
				</S.InventoryHeader>
				
				<S.TabsContainer>
					{tabs.map((tab) => (
						<S.Tab
							key={tab.name}
							onClick={() => handleTabClick(tab.name)}
							$isActive={activeTab === tab.name}
						>
							{tab.icon}
							<span>{tab.name}</span>
						</S.Tab>
					))}
				</S.TabsContainer>

				<S.InventoryGrid>
					{filteredItems.length > 0 ? (
						filteredItems.map((item) => (
							<S.InventorySlot 
								key={item.id} 
								$rarity={item.rarity}
								$equipped={isItemEquipped(item)}
								onClick={() => handleEquipItem(item)}
							>
								{isItemEquipped(item) && (
									<S.EquippedBadge>EQUIPADO</S.EquippedBadge>
								)}
								<S.RarityIndicator $color={rarityColors[item.rarity]} />
								<S.ItemImage src={item.image} alt={item.name} />
								<S.ItemName>{item.name}</S.ItemName>
								<S.ItemCategory>{item.type}</S.ItemCategory>
							</S.InventorySlot>
						))
					) : (
						<S.EmptyState>
							<p>Nenhum item encontrado nesta categoria.</p>
						</S.EmptyState>
					)}
				</S.InventoryGrid>
			</S.ContentContainer>
		</S.GroupSection>
	);
};
