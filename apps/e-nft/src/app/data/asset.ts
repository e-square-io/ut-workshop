import { Contract } from './contract';

export interface Asset {
  assetContract: Contract;
  description: string;
  id: number;
  imagePreviewUrl: string | null;
  imageUrl: string | null;
  name: string;
  tokenId: string;
}
