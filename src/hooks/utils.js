export const CHAIN_MAP = {
  SEV: '7ELEVEN',
  GS25: 'GS25',
  CU: 'CU',
};

// 데이터 변환 함수
export function mapChainName(chainCode) {
  return CHAIN_MAP[chainCode] || chainCode;
}