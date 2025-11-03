import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from "../../../assets/css/adminBanner.module.css";
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

function Banner(props) {

    const [bannerImage, setBannerImage] = useState('');
    const [bannerList, setBannerList] = useState([]);

    const schema = yup.object().shape({
        imgUrl: yup.string().required("이미지 주소를 입력하세요"),
        title: yup.string().required("배너 제목을 입력해주세요"),
    });  

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [rows, setRows] = useState(bannerList);
    
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const newRows = [...rows];
        const [movedItem] = newRows.splice(result.source.index, 1);
        newRows.splice(result.destination.index, 0, movedItem);

        setRows(newRows);
    };


    const showAddBanner = () => {
        setBannerList(prev => [...prev, 
            {
                bannerId: 4,
                image: '',
                title: "",
                linkUrl: "",
                useYn: "Y",  
            }
        ])
        setRows(prev => [...prev,
            {
                bannerId: 4,
                image: '',
                title: '',
                linkUrl: '',
                useYn: 'Y'
            }
        ])
    };

    const addBanner = () => {
        // 서버에 배너 등록
        // rows 넘겨주기
    }

    const changeImage = (addImage=false, e, id) => {
        if(addImage) {
            setBannerImage(e.target.value);
            return;
        }

        setBannerList(prev => {
            const updateList = prev.map((banner) => {
                if(id == banner.bannerId) {
                    banner.image = e.target.value
                }
                return banner;
            });
            return updateList;
        })


    }

    useEffect(() => {
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
        setRows(list)
    }, [])

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
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="table-body">
                {(provided, snapshot) => {
                    console.log(provided)
                    return (
                        <div className="text-center"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                        {rows?.map((row, index) => (

                            <Draggable key={`draggable_${row.bannerId}`} draggableId={`drag_${row.bannerId}`} index={index}>
                            {(provided) => (
                                <div className={`${styles.t_tr} row`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                    ...provided.draggableProps.style,
                                    cursor: "grab",
                                }}
                                id={`drag_${row.bannerId}`}
                                key={`banner_${row.bannerId}`}
                                >
                                    <div className="col-1">{index + 1}</div>
                                    <div className="col-3">
                                        {row.image ? 
                                        <div className={`${styles.img_box}`}>
                                            <img src={row.image} />      
                                        </div> 
                                        : 
                                        <div className={`${styles.img_box} ${styles.add_box}`}>
                                            <BsPlus size="50px" color="aaa" />      
                                        </div>                          
                                    }

                                    </div>
                                    <div className={`${styles.input_box} col-6`}>
                                        <input
                                        type="text"
                                        id="imgUrl"
                                        name="imgUrl"
                                        className="form-control mb-1"
                                        placeholder="이미지 주소를 입력해주세요"
                                        onChange={(e) => changeImage('', e, row.bannerId)}
                                        defaultValue={row.image}
                                        />
                                        <input
                                        type="text"
                                        className="form-control mb-1"
                                        placeholder="배너 제목을 입력해주세요"
                                        defaultValue={row.title}
                                        />
                                        <input
                                        type="text"
                                        className="form-control"
                                        placeholder="이미지 클릭 시 이동할 주소를 입력해주세요"
                                        defaultValue={row.linkUrl}
                                        />
                                    </div>
                                    <div className="col-1">
                                        <input
                                        type="checkbox"
                                        defaultChecked={row.useYn === "Y"}
                                        />
                                    </div>
                                    <div className="col-1">
                                        <button type="button" className="btn btn-outline-danger" onClick={""}>
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
                <BtnForm btnName="배너 수정" type="button" className='btn btn-dark' onClick={addBanner} />
            </div>
        </Container>
    );
}

export default Banner;