import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from "./AdminBanner.module.css";
import { BsPlus } from 'react-icons/bs';
import BtnForm from '../../../components/BtnForm';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import { useAdmin } from '../../../hooks/useAdmin';

function AdminBanner(props) {

    const [bannerList, setBannerList] = useState([]);

    const schema = yup.object().shape({
        rows: yup.array().of(
            yup.object().shape({
                imageFile: yup.mixed().required("이미지 파일을 업로드 해주세요."),
                title: yup.string().required("배너 제목을 입력해주세요"),
            })
        )
    }); 

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            rows: []  // 기본값을 빈 배열로 설정
        }
    });

    const { createBannerMutation } = useAdmin();


    const [rows, setRows] = useState(bannerList); // drag 후 bannerList
    
    // 드래그 끝나고 리스트 정렬 수정
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const newRows = [...rows];
        const [movedItem] = newRows.splice(result.source.index, 1);
        newRows.splice(result.destination.index, 0, movedItem);

        setRows(newRows);
    };

    const showAddBanner = () => {
        setRows(prev => [...prev, 
            {
                image: '',
                title: "",
                linkUrl: "",
                useYn: "Y",  
            }
        ])
    };

    // 배너 등록
    const updateBanners = async() => {
        const formData = new FormData();

        const rowsData = rows.map((banner, index) => ({

            // 기존 이미지 수정일 경우
            // 새 배너 등록일 경우 배너 아이디 보내지 않음
            bannerId: banner.bannerId,

            // 파일이 있는 경우 파일 보내기
            file: banner.imageFile,

            title: banner.title,
            linkUrl: banner.linkUrl,
            useYn: banner.useYn,
        }))

        console.log(formData)
        try {
            // 서버에 formData 넘겨주기
            // await createBannerMutation.mutate(formData); // 배너 등록
            // 

        } catch(e) {
            console.log(e)
        }
    }

    // 배너 삭제
    const deleteBanner = (index) => {
        setRows(prev => prev.filter((banner, idx) => index != idx))
    }

    // 배너 이미지 미리보기
    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            // 이미지 미리보기 URL 생성
            const newUrl = URL.createObjectURL(file);
            setRows(prev => 
                prev.map((banner, idx) => {
                    if(index == idx) {
                        banner.image = newUrl;
                    }
                    return banner;
                })
            )
        }
    }

    useEffect(() => {
        // 서버에서 받아온 배너 리스트
        const list = [
            {
                bannerId: 1,
                image: 'https://hpsimg.gsretail.com/medias/sys_master/images/images/he6/h53/9129317892126.jpg',
                title: "GS25 11월 상품",
                linkUrl: "https://...",
                useYn: "Y",
            },
            {
                bannerId: 2,
                image: 'https://www.7-eleven.co.kr/upload/event/20251030153024104r202.png',
                title: "세븐일레븐 11월 상품",
                linkUrl: "https://...",
                useYn: "Y",
            },
            {
                bannerId: 3,
                image: 'https://hpsimg.gsretail.com/medias/sys_master/images/images/he6/h53/9129317892126.jpg',
                title: "CU 11월 상품",
                linkUrl: "https://...",
                useYn: "Y",
            },
        ];

        setBannerList(list)
    }, [])

    // 배너리스트 변경될 때 마다 rows도 업데이트
    useEffect(() => {
        console.log('배너 리스트 변경')
        setRows(bannerList)
    }, [bannerList])

    console.log(rows)

    return (
        <Container className={`${styles.banner_cont} mt-5`}>
            <div className="btn_box text-end mb-2">
                <button type="button" className='btn btn-outline-dark mb-2' onClick={showAddBanner}>배너 추가</button>
            </div>

            <div className={`${styles.t_head} row`}>
                <div className="col-1">순서</div>
                <div className="col-3">이미지</div>
                <div className="col-6">배너 정보</div>
                <div className="col-1">노출여부</div>
                <div className="col-1">관리</div>
            </div>
            <form action="" autoComplete='off' onSubmit={handleSubmit(updateBanners)}>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="table-body">
                    {(provided, snapshot) => {
                        return (
                            <div className="text-center"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                            {rows?.map((row, index) => (

                                <Draggable key={`draggable_${index}`} draggableId={`drag_${index}`} index={index}>
                                {(provided) => (
                                    <div className={`${styles.t_tr} row`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                        ...provided.draggableProps.style,
                                        cursor: "grab",
                                    }}
                                    id={`drag_${index}`}
                                    key={`banner_${index}`}
                                    >
                                        <div className="col-1">{index + 1}</div>
                                        <div className="col-3">
                                            <label htmlFor={`imageFile${index}`} className={`${styles.img_box} ${!row.image && styles.add_box}`}>
                                                {
                                                    row.image ? 
                                                    <img src={row.image} />      
                                                    :      
                                                    <BsPlus size="50px" color="aaa" />   
                                                }
                                            </label>                   
                                        </div>
                                        <div className={`${styles.input_box} col-6`}>
                                            <input 
                                                type="file" 
                                                id={`imageFile${index}`}
                                                name="imageFile" 
                                                className='d-none'
                                                {...register(`rows[${index}].imageFile`, {
                                                    onChange: (e) => handleFileChange(e, index)
                                                })}
                                            />
                                            {errors?.rows?.[index]?.imageFile && <p className="error-msg">{errors.rows[index].imageFile.message}</p>}
                                            <input
                                            type="text"
                                            className="form-control mb-1"
                                            placeholder="배너 제목을 입력해주세요"
                                            name="title"
                                            defaultValue={row.title}
                                            {...register(`rows[${index}].title`)}
                                            />
                                            <input
                                            type="text"
                                            className="form-control"
                                            placeholder="이미지 클릭 시 이동할 주소를 입력해주세요"
                                            name="linkUrl"
                                            defaultValue={row.linkUrl}
                                            {...register(`rows[${index}].linkUrl`)}
                                            />
                                            {errors?.rows?.[index]?.linkUrl && <p className="error-msg">{errors.rows[index].linkUrl.message}</p>}
                                        </div>
                                        <div className="col-1">
                                            <input
                                            type="checkbox"
                                            name="useYn"
                                            value="Y"
                                            defaultChecked={row.useYn === "Y"}
                                            {...register(`rows[${index}].useYn`)}
                                            />
                                        </div>
                                        <div className="col-1">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => deleteBanner(index)}>
                                            삭제
                                            </button>
                                        </div>
                                    </div>
                                )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            </div>
                        )
                    }}
                    </Droppable>
                </DragDropContext>
                <div className={`${styles.btn_box} text-center w-100 mt-5`}>
                    <BtnForm btnName="배너 수정" type="submit" className='btn btn-dark' />
                </div>
            </form>

        </Container>
    );
}

export default AdminBanner;