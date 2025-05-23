import { Kindergarten } from "./kindergartenDTO";

export interface Favorite {
  id: number;
  kindergartenId: number;
  kindergartenName: string;
  kindergartenAddress: string;
  establishment?: string;
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

export interface FavoritesResponse {
  success: boolean;
  data: Kindergarten[];
  message: string;
}
