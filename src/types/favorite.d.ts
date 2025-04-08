export interface Favorite {
  id: number;
  kindergartenId: number;
  kindergartenName: string;
  kindergartenAddress: string;
  createdAt: string;
}

export interface FavoriteStatusResponse {
  success: boolean;
  data: boolean;
  message: string;
}

export interface FavoriteToggleResponse {
  success: boolean;
  data: {
    favorite: boolean;
  };
  message: string;
}

export interface FavoritesListResponse {
  success: boolean;
  data: Favorite[];
  message: string;
}
