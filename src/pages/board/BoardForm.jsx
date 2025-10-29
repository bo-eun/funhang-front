// import React from 'react';
// import { Link } from 'react-router';

// function BoardForm({type}) {
//     return (
//         <div className='board-list-wrap'>
//             <div className='board-title-bg'>
//                 <input type='text' className='board-title-txt'></input>
//             </div>
//             <section className='content-bg'>
//                 <textarea className='content-txt'></textarea>
//                 <div className='brd-btn-bg'>
//                     <button type='submit' className='min-link-btn-b'>{type==="update"?"수정":"등록"}</button>
//                     <Link to="/board" className='min-link-btn-w'>취소</Link>
//                 </div>
//             </section>   
//         </div>
//     );
// }

// export default BoardForm;
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import '../../assets/css/boardList.css';

function BoardForm({ type }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const quillRef = useRef(null);
  const quillInstanceRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // 설정값 (필요에 따라 props로 받을 수 있음)
  const authToken = null; // 실제로는 props나 context에서 가져오기
  const uploadUrl = '/api/v1/book/ed/img';
  const fileField = 'img';

  /** Quill 인스턴스를 안전하게 획득 */
  const ensureEditor = useCallback(() => {
    if (quillInstanceRef.current) return;
    try {
      const q = quillRef.current?.getEditor();
      if (q) {
        quillInstanceRef.current = q;
        setIsReady(true);
      }
    } catch (error) {
      // 아직 미초기화 상태
    }
  }, []);

  /** 이미지 업로드 → URL 삽입 */
  const uploadAndInsert = useCallback(
    async (file) => {
      if (!file) return;
      const editor = quillInstanceRef.current;
      if (!editor) return;

      const fd = new FormData();
      fd.append(fileField, file);

      try {
        const res = await fetch(uploadUrl, {
          method: 'POST',
          headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
          body: fd,
        });
        if (!res.ok) throw new Error('이미지 업로드 실패');

        const data = await res.json();
        const imageUrl = data.imageUrl || data.url;
        if (!imageUrl) throw new Error('서버 응답에 이미지 URL이 없습니다');

        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, 'image', imageUrl, 'user');
        editor.setSelection(range.index + 1);
      } catch (e) {
        console.error(e);
        alert('이미지 업로드에 실패했습니다.');
      }
    },
    [authToken, uploadUrl, fileField]
  );

  /** 툴바의 이미지 버튼 핸들러 */
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) await uploadAndInsert(file);
    };
  }, [uploadAndInsert]);

  /** 붙여넣기 이미지 처리 */
  useEffect(() => {
    if (!isReady) return;
    const editor = quillInstanceRef.current;
    if (!editor) return;

    const root = editor.root;
    const onPaste = async (e) => {
      const cd = e.clipboardData;
      if (!cd) return;
      const items = Array.from(cd.items);
      const img = items.find((it) => it.type?.startsWith('image/'));
      if (!img) return;

      e.preventDefault();
      e.stopPropagation();

      const file = img.getAsFile();
      if (file) await uploadAndInsert(file);
    };

    root.addEventListener('paste', onPaste);
    return () => root.removeEventListener('paste', onPaste);
  }, [isReady, uploadAndInsert]);

  /** 드래그&드롭 이미지 처리 */
  useEffect(() => {
    if (!isReady) return;
    const editor = quillInstanceRef.current;
    if (!editor) return;

    const el = editor.root;

    const onDrop = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const files = Array.from(e.dataTransfer?.files || []);
      const images = files.filter((f) => f.type.startsWith('image/'));
      try {
        for (const f of images) {
          await uploadAndInsert(f);
        }
      } catch (err) {
        console.error(err);
        alert('이미지 업로드에 실패했습니다.');
      }
    };

    const onDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    el.addEventListener('drop', onDrop, true);
    el.addEventListener('dragover', onDragOver, true);
    return () => {
      el.removeEventListener('drop', onDrop, true);
      el.removeEventListener('dragover', onDragOver, true);
    };
  }, [isReady, uploadAndInsert]);

  /** 모듈/포맷은 useMemo로 고정 */
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: { image: imageHandler },
      },
    }),
    [imageHandler]
  );

  const formats = useMemo(
    () => [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'list',
      'color',
      'background',
      'align',
      'link',
      'image',
    ],
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('제목:', title);
    console.log('내용:', content);
    // 실제 제출 로직 구현
  };

  return (
    <div className='board-list-wrap'>
      <form onSubmit={handleSubmit}>
        <div className='board-title-bg'>
          <input
            type='text'
            className='board-title-txt'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='제목을 입력하세요'
          />
        </div>
        <section className='content-bg'>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            placeholder='내용을 입력하세요...'
            onFocus={ensureEditor}
            onChangeSelection={ensureEditor}
            style={{ height: '500px', marginBottom: '50px' }}
          />
          <div className='brd-btn-bg'>
            <button type='submit' className='min-link-btn-b'>
              {type === "update" ? "수정" : "등록"}
            </button>
            <a href="/board" className='min-link-btn-w'>취소</a>
          </div>
        </section>
      </form>
    </div>
  );
}

export default BoardForm;