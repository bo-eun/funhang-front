import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import styles from '@/pages/board/boardList.module.css';
import axios from 'axios';
import { useBoard } from '../../hooks/useBoard';
import { useNavigate } from 'react-router';

// Quill Size 설정
const Size = Quill.import('attributors/style/size');
Size.whitelist = ['16px', '18px', '20px', '24px', '32px'];
Quill.register(Size, true);

function BoardForm({ type }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { createMutate } = useBoard();

  const navigate = useNavigate();
  
  const quillRef = useRef(null);
  const quillInstanceRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const goSubmit= async()=>{
    navigate('/board');
  }

  // 설정값
  const USE_MOCK = true;
  const authToken = null;
  const uploadUrl = '/api/v1/book/ed/img';
  const fileField = 'img';
  const maxWidth = 1600;
  const maxHeight = 1600;
  const outMime = 'image/jpeg';
  const quality = 0.9;

  /** Quill 인스턴스를 안전하게 획득 */
  useEffect(() => {
    if (quillRef.current && !quillInstanceRef.current) {
      quillInstanceRef.current = quillRef.current.getEditor();
      setIsReady(true); // editor 준비 완료
    }
  }, []);

  /** 이미지 리사이즈 함수 (pica 사용) */
  const resizeImage = useCallback(async (file) => {
    const img = await new Promise((res, rej) => {
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => { URL.revokeObjectURL(url); res(image); };
      image.onerror = rej;
      image.src = url;
    });

    const ratio = Math.min(1, maxWidth / img.width, maxHeight / img.height);
    if (ratio === 1) {
      return file;
    }

    const targetW = Math.round(img.width * ratio);
    const targetH = Math.round(img.height * ratio);

    const from = document.createElement('canvas');
    const to   = document.createElement('canvas');
    from.width = img.width;   from.height = img.height;
    to.width   = targetW;     to.height   = targetH;
    from.getContext('2d').drawImage(img, 0, 0);

    try {
      const pica = (await import('pica')).default();
      await pica.resize(from, to, { quality: 3 });
      const blob = await pica.toBlob(to, outMime, quality);
      return new File([blob],
                      file.name.replace(/\.\w+$/, outMime === 'image/png' ? '.png' : '.jpg'),
                      { type: outMime });
    } catch (e) {
      console.warn('pica 리사이즈 실패, 기본 canvas 사용', e);
      const blob = await new Promise((r) => to.toBlob(r, outMime, quality));
      if (!blob) throw new Error('canvas toBlob 실패');
      return new File([blob],
                      file.name.replace(/\.\w+$/, outMime === 'image/png' ? '.png' : '.jpg'),
                      { type: outMime });
    }
  }, [maxWidth, maxHeight, outMime, quality]);

  /** Mock 이미지 업로드 (Base64) */
  const mockUploadImage = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      
      reader.onerror = () => {
        reject(new Error('파일 읽기 실패'));
      };
      
      reader.readAsDataURL(file);
    });
  }, []);

  /** 서버 업로드 함수 */
  const uploadFile = useCallback(async (file) => {
    if (USE_MOCK) {
      console.log('🎭 Mock 모드: 이미지를 Base64로 변환 중...');
      const url = await mockUploadImage(file);
      console.log('✅ Mock 업로드 성공');
      return url;
    }
    

    const fd = new FormData();
    fd.append(fileField, file);
    
    const res = await fetch(uploadUrl, {
      method: 'POST',
      headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      body: fd,
    });
    
    if (!res.ok) throw new Error('이미지 업로드 실패');
    
    const data = await res.json();
    const url = data.imageUrl || data.url;
    if (!url) throw new Error('서버 응답에 URL이 없습니다');
    return url;
  }, [USE_MOCK, mockUploadImage, authToken, uploadUrl, fileField]);

  /** URL에서 이미지를 다운로드하여 리사이즈 후 재업로드 */
  const reuploadResizedImage = useCallback(async (imgElement, newWidth, newHeight) => {
    try {
      const originalSrc = imgElement.getAttribute('data-original-src') || imgElement.src;
      console.log('리사이즈 후 재업로드:', originalSrc);

      // Base64 이미지 처리
      let blob;
      if (originalSrc.startsWith('data:')) {
        // Base64를 blob으로 변환
        const response = await fetch(originalSrc);
        blob = await response.blob();
      } else {
        // 절대 URL을 상대 경로로 변환
        let imagePath = originalSrc;
        try {
          const url = new URL(originalSrc);
          imagePath = url.pathname;
        } catch (e) {
          // 이미 상대 경로인 경우 그대로 사용
        }

        // 이미지를 fetch로 가져오기
        const response = await axios.get(imagePath, { responseType: 'blob' });
        blob = response.data;
      }

      // Canvas로 리사이즈
      const img = await new Promise((res, rej) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => res(image);
        image.onerror = rej;
        image.src = URL.createObjectURL(blob);
      });

      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Canvas를 blob으로 변환
      const resizedBlob = await new Promise((resolve) => {
        canvas.toBlob(resolve, outMime, quality);
      });

      const file = new File([resizedBlob], 'resized.jpg', { type: outMime });

      // 서버에 업로드 (또는 Mock)
      const newUrl = await uploadFile(file);

      // 원본 URL 저장 (처음 한 번만)
      if (!imgElement.getAttribute('data-original-src')) {
        imgElement.setAttribute('data-original-src', originalSrc);
      }

      // 새 URL로 교체
      imgElement.src = newUrl;
      console.log('✅ 리사이즈 후 재업로드 완료');

    } catch (err) {
      console.error('이미지 재업로드 실패:', err);
      alert('이미지 리사이즈 저장에 실패했습니다.');
    }
  }, [uploadFile, outMime, quality]);

  /** 이미지 업로드 → URL 삽입 */
  const uploadAndInsert = useCallback(
    async (file) => {      
      const editor = quillInstanceRef.current;
      if (!editor) {
        alert('에디터가 준비되지 않았습니다. 잠시 후 다시 시도해주세요.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 크기는 5MB를 초과할 수 없습니다.');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드할 수 있습니다.');
        return;
      }

      try {
        // 이미지 리사이즈 후 업로드
        const resized = await resizeImage(file);
        const url = await uploadFile(resized);

        // 에디터에 이미지 삽입
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, 'image', url);
        editor.setSelection(range.index + 1);
        
        console.log('✅ 이미지 삽입 완료');
      } catch (e) {
        console.error('❌ 업로드 오류:', e);
        alert(`이미지 업로드에 실패했습니다: ${e.message}`);
      }
    },
    [resizeImage, uploadFile]
  );

  /** 툴바의 이미지 버튼 핸들러 */
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        await uploadAndInsert(file);
      }
    };
    input.click();
  }, [uploadAndInsert]);

  /** 붙여넣기 이미지 처리 */
  useEffect(() => {
    if (!isReady) return;
    const editor = quillInstanceRef.current;
    if (!editor) return;

    const root = editor.root;
    const handlePaste = async (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          e.preventDefault();
          e.stopPropagation();

          const file = items[i].getAsFile();
          if (!file) continue;

          await uploadAndInsert(file);
          break;
        }
      }
    };

    root.addEventListener('paste', handlePaste, true);
    return () => root.removeEventListener('paste', handlePaste, true);
  }, [isReady, uploadAndInsert]);

  /** 드래그&드롭 이미지 처리 */
  useEffect(() => {
    if (!isReady) return;
    const editor = quillInstanceRef.current;
    if (!editor) return;

    const el = editor.root;
    let isUploading = false;

    const handleDrop = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isUploading) return;

      const files = e.dataTransfer?.files;
      if (!files || files.length === 0) return;

      const file = files[0];
      if (!file.type.startsWith('image/')) return;

      isUploading = true;

      try {
        await uploadAndInsert(file);
      } catch (err) {
        console.error('이미지 업로드 실패:', err);
        alert('이미지 업로드에 실패했습니다.');
      } finally {
        isUploading = false;
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    el.addEventListener('drop', handleDrop, true);
    el.addEventListener('dragover', handleDragOver, true);
    return () => {
      el.removeEventListener('drop', handleDrop, true);
      el.removeEventListener('dragover', handleDragOver, true);
    };
  }, [isReady, uploadAndInsert]);

  /** 이미지 핸들 리사이즈 기능 */
  useEffect(() => {
    if (!isReady) return; // editor가 준비될 때까지 기다림
    const editor = quillInstanceRef.current;
    if (!editor) return;

    const editorElement = editor.root;

    // CSS 스타일 추가
    const style = document.createElement('style');
    style.id = 'quill-image-resize-style';
    style.textContent = `
      .ql-editor img {
        cursor: pointer;
        max-width: 100%;
      }
      .image-resize-overlay {
        position: absolute;
        box-sizing: border-box;
        border: 1px dashed #4285f4;
        z-index: 1000;
        pointer-events: none;
      }
      .image-resize-handle {
        position: absolute;
        width: 12px;
        height: 12px;
        background: white;
        border: 1px solid #4285f4;
        box-sizing: border-box;
        z-index: 1001;
        pointer-events: auto;
      }
      .image-resize-handle.nwse-resize { cursor: nwse-resize; }
      .image-resize-handle.nesw-resize { cursor: nesw-resize; }
      .image-resize-handle.ns-resize { cursor: ns-resize; }
      .image-resize-handle.ew-resize { cursor: ew-resize; }
    `;
    document.head.appendChild(style);

    let selectedImage = null;
    let overlay = null;
    let handles = [];
    let isResizing = false;
    let startX, startY, startWidth, startHeight, aspectRatio, resizePosition;

    const createOverlay = (img) => {
      // 기존 오버레이 제거
      removeOverlay();

      overlay = document.createElement('div');
      overlay.classList.add('image-resize-overlay');
      
      const parent = editorElement.parentNode;
      parent.style.position = 'relative';
      parent.appendChild(overlay);

      positionOverlay(img);
      createHandles();
    };

    const positionOverlay = (img) => {
      if (!overlay || !img) return;

      const parent = editorElement.parentNode;
      const imgRect = img.getBoundingClientRect();
      const containerRect = parent.getBoundingClientRect();

      Object.assign(overlay.style, {
        left: `${imgRect.left - containerRect.left - 2 + parent.scrollLeft}px`,
        top: `${imgRect.top - containerRect.top - 2 + parent.scrollTop}px`,
        width: `${imgRect.width + 4}px`,
        height: `${imgRect.height + 4}px`,
      });
    };

    const createHandles = () => {
      const positions = [
        { name: 'nw', top: '-6px', left: '-6px', cursor: 'nwse-resize' },
        { name: 'ne', top: '-6px', right: '-6px', cursor: 'nesw-resize' },
        { name: 'sw', bottom: '-6px', left: '-6px', cursor: 'nesw-resize' },
        { name: 'se', bottom: '-6px', right: '-6px', cursor: 'nwse-resize' },
        { name: 'n', top: '-6px', left: '50%', marginLeft: '-6px', cursor: 'ns-resize' },
        { name: 's', bottom: '-6px', left: '50%', marginLeft: '-6px', cursor: 'ns-resize' },
        { name: 'w', top: '50%', left: '-6px', marginTop: '-6px', cursor: 'ew-resize' },
        { name: 'e', top: '50%', right: '-6px', marginTop: '-6px', cursor: 'ew-resize' },
      ];

      positions.forEach(pos => {
        const handle = document.createElement('div');
        handle.classList.add('image-resize-handle', pos.cursor);
        Object.assign(handle.style, pos);
        
        handle.addEventListener('mousedown', (e) => handleMouseDown(e, pos.name));
        
        overlay.appendChild(handle);
        handles.push(handle);
      });
    };

    const removeOverlay = () => {
      if (overlay) {
        handles.forEach(h => h.remove());
        handles = [];
        overlay.remove();
        overlay = null;
      }
    };

    const handleImageClick = (e) => {
      if (e.target.tagName === 'IMG') {
        if (selectedImage === e.target) return;
        selectedImage = e.target;
        createOverlay(selectedImage);
      } else {
        selectedImage = null;
        removeOverlay();
      }
    };

    const handleMouseDown = (e, position) => {
      e.preventDefault();
      e.stopPropagation();

      if (!selectedImage) return;

      isResizing = true;
      resizePosition = position;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = selectedImage.offsetWidth;
      startHeight = selectedImage.offsetHeight;
      aspectRatio = startWidth / startHeight;

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
      if (!isResizing || !selectedImage) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      let newWidth = startWidth;
      let newHeight = startHeight;

      // 각 핸들 위치에 따른 리사이징
      if (resizePosition.includes('e')) newWidth = startWidth + deltaX;
      if (resizePosition.includes('w')) newWidth = startWidth - deltaX;
      if (resizePosition.includes('s')) newHeight = startHeight + deltaY;
      if (resizePosition.includes('n')) newHeight = startHeight - deltaY;

      // 비율 유지 (모서리 핸들의 경우)
      if (resizePosition.length === 2) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          newHeight = newWidth / aspectRatio;
        } else {
          newWidth = newHeight * aspectRatio;
        }
      }

      // 최소 크기 제한
      if (newWidth < 50) newWidth = 50;
      if (newHeight < 50) newHeight = 50;

      selectedImage.style.width = `${newWidth}px`;
      selectedImage.style.height = 'auto';
      
      positionOverlay(selectedImage);
    };

    const handleMouseUp = async () => {
      if (!isResizing || !selectedImage) return;

      isResizing = false;

      const finalWidth = selectedImage.offsetWidth;
      const finalHeight = selectedImage.offsetHeight;

      // 리사이즈 후 재업로드
      if (finalWidth !== selectedImage.naturalWidth) {
        await reuploadResizedImage(selectedImage, finalWidth, finalHeight);
      }

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    editorElement.addEventListener('click', handleImageClick);

    return () => {
      editorElement.removeEventListener('click', handleImageClick);
      removeOverlay();
      const existingStyle = document.getElementById('quill-image-resize-style');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, [isReady, reuploadResizedImage]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ size: ['16px', '18px', '20px', '24px', '32px'] }],
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
      'bold',
      'italic',
      'underline',
      'size',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('제목:', title);
    console.log('내용:', content);

    // await createMutate.mutateAsync();
    navigate('/board');
    
    // if (USE_MOCK) {
    //   console.log('📝 Mock 제출 데이터:', {
    //     title,
    //     content,
    //     contentLength: content.length
    //   });
    //   alert('Mock 모드: 게시글이 제출되었습니다! (콘솔 확인)');
    // }
  };

  return (
    <>
      {USE_MOCK && (
        <div style={{ 
          background: '#fff3cd', 
          padding: '10px', 
          marginBottom: '10px', 
          borderRadius: '4px',
          border: '1px solid #ffc107'
        }}>
          🎭 Mock 모드 | 이미지 클릭 후 핸들을 드래그하여 크기 조정
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles.board_title_bg}>
          <input
            type='text'
            className={styles['board_title_txt']}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='제목을 입력하세요'
            />
        </div>
        <section className={styles.content_bg}>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            placeholder='내용을 입력하세요...'
            style={{ height: '500px', marginBottom: '50px' }}
            />
          <div className='short_btn_bg'>
            <button type='submit' className='min_btn_b' onClick={goSubmit}>
              {type === "update" ? "수정" : "등록"}
            </button>
            <a href={type==="update"?"/board/detail":"/board"} className='min_btn_w'>취소</a>
          </div>
        </section>
      </form>
    </>
  );
}

export default BoardForm;