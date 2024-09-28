export type SocialProvider = 'KAKAO' | 'APPLE';

export interface AuthRequest {
  provider: SocialProvider;
  code: string;
}

export interface AuthResponse {
  grantType: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

export interface ErrorResponse {
  message: string;
  data: {
    message: string;
    code: number;
  };
}

export interface TokenRenewalRequest {
  accessToken: string;
  refreshToken: string;
}