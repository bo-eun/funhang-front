import React, {useMemo } from 'react';
import '../assets/css/pagination.css';

function Pagination({
  page,
  totalRows,
  movePage,
  pagePerRows = 8,
  blockPerCount = 10,
  wrapperClass = 'pagination-wrapper',
  listClass = 'pagination-list',
  itemClass = 'pagination-item',
  linkClass = 'pagination-link',
}) {

  const calculatePageData = useMemo(() => {
    if (!totalRows || totalRows <= 0 || !pagePerRows || pagePerRows <= 0) {
      return { totalPage: 0, nowBlock: 0, totalBlock: 0 };
    }

    const totalPage = Math.ceil(totalRows / pagePerRows);
    const nowBlock = Math.floor((page ?? 0) / blockPerCount);
    const totalBlock = Math.ceil(totalPage / blockPerCount);
    console.log('Pagination → totalRows:', totalRows, 'pagePerRows:', pagePerRows, 'totalPage:', totalPage);
    return { totalPage, nowBlock, totalBlock };
  }, [totalRows, pagePerRows, page, blockPerCount]);

  const renderPage = () => {
    const { totalPage, nowBlock, totalBlock } = calculatePageData;
    if (totalPage === 0) return null;

    const pageHTML = [];

    // 처음으로 가기
    let isDisabled = page === 0;
    pageHTML.push(
      <li key="first" className={`${itemClass} ${isDisabled ? 'disabled' : ''}`}>
        <button className={linkClass} disabled={isDisabled} onClick={() => movePage(0)}>처음</button>
      </li>
    );

    // 이전 블럭 가기
    isDisabled = nowBlock <= 0;
    const prevBlockPage = (nowBlock * blockPerCount) - 1;
    pageHTML.push(
      <li key="prev" className={`${itemClass} ${isDisabled ? 'disabled' : ''}`}>
        <button className={linkClass} disabled={isDisabled} onClick={() => movePage(prevBlockPage)}>이전</button>
      </li>
    );

    // 페이지 번호 그리기
    for (let i = 0; i < blockPerCount; i++) {
      const pageNum = (nowBlock * blockPerCount) + i;
      if (pageNum >= totalPage) break;

      const isActive = page === pageNum ? 'active' : '';
      pageHTML.push(
        <li key={pageNum} className={`${itemClass} ${isActive}`}>
          <button className={linkClass} onClick={() => movePage(pageNum)}>{pageNum + 1}</button>
        </li>
      );
    }

    // 다음 블럭 가기
    isDisabled = (nowBlock + 1) >= totalBlock;
    const nextBlockPageNum = (nowBlock + 1) * blockPerCount;
    pageHTML.push(
      <li key="next" className={`${itemClass} ${isDisabled ? 'disabled' : ''}`}>
        <button className={linkClass} disabled={isDisabled} onClick={() => movePage(nextBlockPageNum)}>다음</button>
      </li>
    );

    // 마지막 페이지 가기
    isDisabled = page >= totalPage - 1;
    const lastPageNum = totalPage - 1;
    pageHTML.push(
      <li key="last" className={`${itemClass} ${isDisabled ? 'disabled' : ''}`}>
        <button className={linkClass} disabled={isDisabled} onClick={() => movePage(lastPageNum)}>마지막</button>
      </li>
    );

    return pageHTML;
  };

  return (
    <nav className={wrapperClass} aria-label="Page navigation">
      <ul className={listClass}>
        {renderPage()}
      </ul>
    </nav>
  );
}

export default Pagination;


