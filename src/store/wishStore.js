import { create } from 'zustand';
import { wishApi } from '../api/mypage/wishApi';

export const wishStore = create((set, get) => ({
  // --------------------
  // 상태
  // --------------------
  list: [], // 찜한 상품 목록
  loading: {}, // 상품별 클릭 중 상태

  // --------------------
  // 액션: 상태 직접 설정
  // --------------------
  // DB에서 찜 목록 가져오기
  fetchList: async () => {
    try {
      const data = await wishApi.list();
      set({ list: data.content || [] });
    } catch (err) {
      console.error('찜 목록 가져오기 실패', err);
    }
  },

  // --------------------
  // 액션: 찜 토글
  // --------------------
  toggleWish: async (product) => {
    const crawlId = product.crawlId;

    // UI 즉시 반영
    // 중복 클릭 방지
    if (get().loading[crawlId]) return;

    set(state => ({ loading: { ...state.loading, [crawlId]: true } }));

    //ITEM comp 에서 props로 받은 data가 list에 있는지 체크
    const exists = get().list.some(item => item.crawlId === crawlId);

    set(state => ({
      list: exists
        ? state.list.filter(item => item.crawlId !== crawlId)
        : [...state.list, product]
    }));

    //DB 반영
    try {
      if (!exists) {
        await wishApi.add(crawlId);
      } else {
        await wishApi.delete(crawlId);
      }
    } catch (err) {
      console.error(err);
      alert('찜 처리 중 오류가 발생했습니다.');

      // 실패 시 원래 상태로 롤백
      set(state => ({
        list: exists
          ? [...state.list, product]
          : state.list.filter(item => item.crawlId !== crawlId)
      }));
    } finally {
      // 클릭 가능 상태 복원
      set(state => ({ loading: { ...state.loading, [crawlId]: false } }));
    }
  },

  // --------------------
  // 유틸: 찜 여부 확인
  // --------------------
  isWish: (crawlId) => get().list.some(item => item.crawlId === crawlId),
  // --------------------
  // 로그아웃
  // --------------------
  reset: () => set({ list: [], loading: {} })
}));
