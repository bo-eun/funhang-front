import { create } from 'zustand';
import { mypageApi } from '../api/mypage/mypageApi';

export const useWishStore = create((set, get) => ({
  list: [],   // 찜 상품 배열 [{crawlId, likeCount, ...}, ...]
  
  setList: (newList) => set({ list: newList }),

  addWish: async (product) => {
    try {
      const res = await mypageApi.add(product.crawlId);
      if (res.resultMessage === 'ADDED') {
        set((state) => ({ list: [...state.list, { ...product, likeCount: res.likeCount }] }));
      } else if (res.resultMessage === '이미존재하는상품입니다.') {
        // 이미 찜한 상품이면 삭제 API 호출
        await get().removeWish(product.crawlId);
      }
    } catch (err) {
      console.error(err);
      alert('찜 추가 실패');
    }
  },

  removeWish: async (crawlId) => {
    try {
      await mypageApi.delete(crawlId);
      set((state) => ({ list: state.list.filter(item => item.crawlId !== crawlId) }));
    } catch (err) {
      console.error(err);
      alert('찜 삭제 실패');
    }
  },

  // 유틸: 찜 여부 확인
  isWish: (crawlId) => {
    return get().list.some(item => item.crawlId === crawlId);
  }
}));
