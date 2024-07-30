type GrayColors = {
  Gray01: string;
  Gray02: string;
  Gray03: string;
  Gray04: string;
  Gray05: string;
  Gray06: string;
  Gray07: string;
};

type OrangeColors = {
  Orange01: string;
  Orange02: string;
};

export interface IColors {
  black: string;
  white: string;
  gray: GrayColors;
  orange: OrangeColors;
  shadow: string;
}

export const COLORS: IColors = {
  black: '#000',
  white: '#FFF',
  gray: {
    Gray01: '#FBFBFB',
    Gray02: '#ECECEC',
    Gray03: '#C1C1C1',
    Gray04: '#A5A5A5',
    Gray05: '#6F6F6F',
    Gray06: '#555',
    Gray07: '#333',
  },
  orange: {
    Orange01: '#FF5F2C',
    Orange02: '#FFD1C3',
  },
  shadow: '#EEEEEE',
};

export interface IFontFamily {
  pretendard_regular: string;
  pretendard_bold: string;
}

export const FONTFAMILY: IFontFamily = {
  pretendard_regular: 'Pretendard-Regular',
  pretendard_bold: 'Pretendard-Bold',
};
