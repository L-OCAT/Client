import {COLORS} from '../../lib/styles/theme';

export enum MainCategory {
  WALLET = '지갑',
  BAG = '가방',
  ELECTRONICS = '전자기기',
  CLOTHING = '의류',
  STATIONERY = '문구류',
  CARD = '카드',
  JEWELRY = '귀금속',
  NONE = '해당없음',
}

export enum WalletSubCategory {
  CARD_WALLET = '카드지갑',
  SMALL_WALLET = '단지갑',
  MEDIUM_WALLET = '중지갑',
  LARGE_WALLET = '장지갑',
  OTHER = '기타',
}

export enum BagSubCategory {
  ECO_BAG = '에코백',
  BACKPACK = '백팩',
  SHOULDER_BAG = '숄더백',
  TOTE_BAG = '토트백',
  MESSENGER_BAG = '메신저백',
  POUCH = '파우치',
  OTHER = '기타',
}

export enum ElectronicsSubCategory {
  PHONE = '휴대폰',
  TABLET = '태블릿',
  SMARTWATCH = '스마트워치',
  EARPHONES = '이어폰',
  CAMERA = '카메라',
  OTHER = '기타',
}

export enum ClothingSubCategory {
  HAT = '모자',
  SHOES = '신발',
  OUTER = '아우터',
  TOP_BOTTOM = '상/하의',
  OTHER = '기타',
}

export enum StationerySubCategory {
  BOOK = '도서',
  NOTEBOOK = '서류',
  SCHOOL_SUPPLIES = '학용품',
  OTHER = '기타',
}

export enum CardSubCategory {
  TRANSPORTATION_CARD = '교통카드',
  PAYMENT_CARD = '체크/신용카드',
  ID_CARD = '주민등록증/운전면허증',
  OTHER = '기타',
}

export enum JewelrySubCategory {
  RING = '반지',
  EARRINGS = '귀걸이',
  NECKLACE = '목걸이',
  WATCH = '시계',
  OTHER = '기타',
}

export type SubCategory =
  | WalletSubCategory
  | BagSubCategory
  | ElectronicsSubCategory
  | ClothingSubCategory
  | StationerySubCategory
  | CardSubCategory
  | JewelrySubCategory
  | 'OTHER';

export interface CategorySelection {
  main: MainCategory | null;
  sub: SubCategory | null;
}

export const SUB_CATEGORIES: Record<
  Exclude<MainCategory, MainCategory.NONE>,
  SubCategory[]
> = {
  [MainCategory.WALLET]: Object.values(WalletSubCategory),
  [MainCategory.BAG]: Object.values(BagSubCategory),
  [MainCategory.ELECTRONICS]: Object.values(ElectronicsSubCategory),
  [MainCategory.CLOTHING]: Object.values(ClothingSubCategory),
  [MainCategory.STATIONERY]: Object.values(StationerySubCategory),
  [MainCategory.CARD]: Object.values(CardSubCategory),
  [MainCategory.JEWELRY]: Object.values(JewelrySubCategory),
};

export enum ColorOption {
  WHITE = '화이트',
  BLACK = '블랙',
  GRAY = '그레이',
  RED = '레드',
  ORANGE = '오렌지',
  YELLOW = '옐로우',
  GREEN = '그린',
  SKY_BLUE = '스카이블루',
  BLUE = '블루',
  PURPLE = '퍼플',
  PINK = '핑크',
  BROWN = '브라운',
  OTHER = '기타',
}

export const COLOR_VALUES: Record<ColorOption, string | null> = {
  [ColorOption.WHITE]: COLORS.white,
  [ColorOption.BLACK]: COLORS.black,
  [ColorOption.GRAY]: '#E5E5E5',
  [ColorOption.RED]: '#FF3838',
  [ColorOption.ORANGE]: COLORS.orange.Orange01,
  [ColorOption.YELLOW]: '#FFEA2C',
  [ColorOption.GREEN]: '#7EC02B',
  [ColorOption.SKY_BLUE]: '#A7DFFF',
  [ColorOption.BLUE]: '#2C9AFF',
  [ColorOption.PURPLE]: '#7544FF',
  [ColorOption.PINK]: '#FFA0A0',
  [ColorOption.BROWN]: '#7D2B2B',
  [ColorOption.OTHER]: null,
};

export type SelectedColors = ColorOption[];

export interface RequiredLostItemFields {
  name: string;
  category: CategorySelection;
  colors: SelectedColors;
  isRewardOffered: boolean;
  location: string | null;
}

export interface OptionalLostItemFields {
  image: string;
  description?: string;
}

export type LostItem = RequiredLostItemFields & OptionalLostItemFields;

export type PartialLostItem = Partial<RequiredLostItemFields> &
  OptionalLostItemFields;
