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

/**
 * Interface for Inventory Item
 */
interface InventoryItem {
	id: string;
	name: string;
	type: string; // Display type (e.g. 'CALÇA')
	category?: string; // Internal category (e.g. 'pants')
	itemId: number;
	textureId: number;
	image?: string;
	rarity: string;
	equipped?: boolean;
}

const rarityColors: Record<string, string> = {
	common: '#a1a1aa',
	rare: '#3b82f6',
	epic: '#a855f7',
	legendary: '#f59e0b',
};

// Helper to map DB categories to Folder Names in /public/assets
const dbCategoryToFolder: Record<string, string> = {
	'pants': 'legs',
	'tshirt': 'tops',       // Mapping tshirt to tops based on directory analysis
	'torso': 'tops',        // Mapping torso to tops
	'shoes': 'shoes',
	'hat': 'masks',         // Provisional mapping
	'mask': 'masks',
	'undershirt': 'undershirts',
	'leg': 'legs',
	'top': 'tops',
	'shoe': 'shoes',
};

// Helper to map DB categories to Frontend Display Types
const dbCategoryToDisplay: Record<string, string> = {
	'pants': 'CALÇA',
	'tshirt': 'CAMISETA',
	'torso': 'JAQUETA',
	'hat': 'CHAPEU',
	'bracelet': 'LUVA',
	'glasses': 'ÓCULOS',
	'accessory': 'ACESSÓRIO',
	'shoes': 'CALÇADOS',
	'vest': 'COLETE',
	'parachute': 'PARAQUEDAS'
};

/**
 * Gets the image URL for an item.
 * Priority:
 * 1. Database `imageUrl` field (if exists and is not null/empty)
 * 2. Local convention: /assets/[folder]/[gender]/[componentId]/[textureId].webp
 */
const getItemImageUrl = (item: InventoryItem) => {
	// Prioritize local convention over DB image for now to fix legacy seed data
	// if (item.image) return item.image;

	// Determine folder name from category
	// Use item.category (from DB) if available, otherwise lowercase item.type
	// Fallback to strict lowercasing of DB categories if undefined
	const categoryKey = item.category || item.type.toLowerCase();
	const folder = dbCategoryToFolder[categoryKey] || categoryKey;

	// Determine gender - defaulting to 'male' as per current assets structure check
	// valid values: 'male', 'female'
	// TODO: Get this from userData or PlayerAppearance if available
	const gender = 'male';

	// Convention: /assets/tops/male/11/0.webp
	return `/assets/${folder}/${gender}/${item.itemId}/${item.textureId}.webp`;
};

export const Inventory = () => {
	const [activeTab, setActiveTab] = useState('GERAL');
	const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
	const [equippedItems, setEquippedItems] = useState<Record<string, string>>({});
	const [loading, setLoading] = useState(false);

	const userData = JSON.parse(localStorage.getItem('userData') || '{}');

	useEffect(() => {
		if (userData?.id) {
			fetchInventory();
		} else {
			console.warn("Inventory: No User ID found in localStorage");
		}
	}, [userData?.id]);

	const fetchInventory = async () => {
		try {
			console.log("Fetching inventory for UserID:", userData.id);
			setLoading(true);
			// Fixed API endpoint from /clothes to /items based on backend routes
			const response = await apiClient().get(`/appearance/user/${userData.id}/items`);
			console.log("Inventory API Response:", response.data);

			// Transform API response to InventoryItem format
			const mappedItems: InventoryItem[] = response.data.map((entry: any) => {
				const itemDetails = entry.item;
				const displayType = dbCategoryToDisplay[itemDetails.category] || itemDetails.category.toUpperCase();

				return {
					id: entry.id, // PlayerClothingItem ID
					name: itemDetails.name,
					type: displayType,
					category: itemDetails.category,
					itemId: itemDetails.componentId,
					textureId: itemDetails.textureId,
					image: itemDetails.imageUrl, // Priority 1
					rarity: itemDetails.rarity,
					equipped: entry.equipped
				};
			});

			console.log("Mapped Inventory Items:", mappedItems);
			setInventoryItems(mappedItems);

			// Set initial equipped state
			const initialEquipped: Record<string, string> = {};
			mappedItems.forEach(item => {
				if (item.equipped) {
					initialEquipped[item.type] = item.id;
				}
			});
			setEquippedItems(initialEquipped);

		} catch (error) {
			console.error('Error fetching inventory:', error);
			// toast.error('Erro ao carregar inventário.');
		} finally {
			setLoading(false);
		}
	};

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
				category: item.type, // Map back to DB expected category if needed, but controller seems to handle the Frontend types in `categoryMap`
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
					{loading && filteredItems.length === 0 ? (
						<div style={{ padding: '2rem', color: '#fff' }}>Carregando inventário...</div>
					) : (
						filteredItems.length > 0 ? (
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
									<S.ItemImage
										src={getItemImageUrl(item)}
										alt={item.name}
										onError={(e) => {
											// Fallback if image fails to load
											(e.target as HTMLImageElement).src = '/assets/placeholder.png';
										}}
									/>
									<S.ItemName>{item.name}</S.ItemName>
									<S.ItemCategory>{item.type}</S.ItemCategory>
								</S.InventorySlot>
							))
						) : (
							<S.EmptyState>
								<p>Nenhum item encontrado nesta categoria.</p>
							</S.EmptyState>
						)
					)}
				</S.InventoryGrid>
			</S.ContentContainer>
		</S.GroupSection>
	);
};
