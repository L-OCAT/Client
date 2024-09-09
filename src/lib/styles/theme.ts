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
  defaultBG: string;
  black: string;
  white: string;
  gray: GrayColors;
  orange: OrangeColors;
  shadow: string;
  btn_disabled: string;
}

export const COLORS: IColors = {
  defaultBG: '#F4F5F8',
  black: '#17171B',
  white: '#FBFCFD',
  gray: {
    Gray01: '#F4F4F4',
    Gray02: '#E2E2E4',
    Gray03: '#C3C3C6',
    Gray04: '#A0A0A4',
    Gray05: '#68686D',
    Gray06: '#555555',
    Gray07: '#353539',
  },
  orange: {
    Orange01: '#FF5F2C',
    Orange02: '#FFD1C3',
  },
  shadow: '#EEEEEE',
  btn_disabled: '#FFEDE7',
};

export interface IFontFamily {
  pretendard_regular: string;
  pretendard_bold: string;
  pretendard_medium: string;
  pretendard_semibold: string;
}

export const FONTFAMILY: IFontFamily = {
  pretendard_regular: 'Pretendard-Regular',
  pretendard_bold: 'Pretendard-Bold',
  pretendard_semibold: 'Pretendard-SemiBold',
  pretendard_medium: 'Pretendard-Medium',
};
