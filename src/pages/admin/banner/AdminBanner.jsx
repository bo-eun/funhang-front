import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./AdminBanner.module.css";
import { BsPlus } from "react-icons/bs";
import BtnForm from "@/components/btn/BtnForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useAdmin } from "../../../hooks/useAdmin";
import { adminApi } from "../../../api/banner/bannerAdminApi";
function AdminBanner(props) {
  const schema = yup.object().shape({
    rows: yup.array().of(
      yup.object().shape({
        file: yup.mixed().when("imgUrl", (imgUrl, schema) => {
          return imgUrl
            ? schema
            : schema.required("이미지 파일을 업로드 해주세요.");
        }),
        title: yup.string().required("배너 제목을 입력해주세요"),
      })
    ),
  });

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      rows: [], // 기본값을 빈 배열로 설정
    },
  });

  const { fields, append, remove, move, replace } = useFieldArray({
    control,
    name: "rows",
  });

  const rows = watch("rows"); // form 상태에서 직접 가져오기
  const { createBannerMutation, deleteBannerMutation } = useAdmin();

  // 드래그 끝나고 리스트 정렬 수정
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  // 배너 추가
  const showAddBanner = () => {
    append({ imgUrl: "", title: "", linkUrl: "", useYn: "Y" });
  };

  // 배너 노출 개수 확인
  const checkBannerCount = () => {
    let useBannerCount = 0;
    rows.forEach((row) => {
      row.useYn.checked ? ++useBannerCount : useBannerCount;
    });

    console.log(useBannerCount);

    useBannerCount > 5 ? true : false;
  };

  // 폼데이터 만들기
  const makeFormData = () => {
    const formData = new FormData(); // 등록용 데이터

    let fileLength = 0;
    rows.forEach((item, index) => {
      if (item.file[0]) {
        formData.append("files", item.file[0]);
        rows[index].fileIndex = fileLength++;
      } else {
        rows[index].fileIndex = -1;
      }
    });

    // 백에서 List<BannerRequestDTO>로 받을 수 있도록 타입 변환
    formData.append(
      "data",
      new Blob([JSON.stringify(rows)], { type: "application/json" })
    );

    console.log(rows);

    return formData;
  };

  // 배너 등록
  const updateBanners = async () => {
    const formData = makeFormData();

    if (checkBannerCount()) {
      alert("배너 노출 개수는 최대 5개 입니다.");
      return;
    }

    try {
      const result = await createBannerMutation.mutateAsync(formData); // 배너 등록
      console.log(result);
      if (result.resultCode == 200) {
        replace(rows);
        alert("배너 수정이 완료되었습니다.");
      } else {
        alert("요청 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.log(error);
      alert("배너 등록 실패");
    }
  };

  // 배너 삭제
  const deleteBanner = async (index) => {
    if (!rows[index].bannerId) {
      remove(index);
      return;
    }

    if (!confirm("배너를 삭제하시겠습니까?")) return;

    try {
      const result = await deleteBannerMutation.mutateAsync(
        rows[index].bannerId
      );
      console.log(result);
      if (result.status == 200) {
        alert("배너 삭제가 완료되었습니다.");
        remove(index);
      } else {
        console.log("삭제 오류");
      }
    } catch (error) {
      console.log(error);
      alert("배너 삭제 실패");
    }
  };

  // 배너 이미지 미리보기
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      // 이미지 미리보기 URL 생성
      const newUrl = URL.createObjectURL(file);
      const currentRows = getValues("rows");
      const newRows = [...currentRows];
      newRows[index] = {
        ...newRows[index],
        file: [file],
        imgUrl: newUrl,
      };
      setValue("rows", newRows);
    }
  };

  // 서버에서 배너 리스트 받아오기
  useEffect(() => {
    const fetchBannerList = async () => {
      try {
        const result = await adminApi.allList();
        const list = result.data.response.data;
        console.log(result.data.response.data);
        replace(list);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBannerList();
  }, [replace]);

  return (
    <Container className={`${styles.banner_cont} mt-5`}>
      <div className="btn_box text-end mb-2">
        <button
          type="button"
          className="btn btn-outline-dark mb-2"
          onClick={showAddBanner}
        >
          배너 추가
        </button>
      </div>

      <div className={`${styles.t_head} row`}>
        <div className="col-1">순서</div>
        <div className="col-3">이미지</div>
        <div className="col-6">배너 정보</div>
        <div className="col-1">노출여부</div>
        <div className="col-1">관리</div>
      </div>
      <form action="" autoComplete="off" onSubmit={handleSubmit(updateBanners)}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="table-body">
            {(provided, snapshot) => {
              return (
                <div
                  className="text-center"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {fields.map((row, index) => (
                    <Draggable
                      key={`draggable_${index}`}
                      draggableId={`drag_${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className={`${styles.t_tr} row`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            cursor: "grab",
                          }}
                          id={`drag_${index}`}
                        >
                          <div className="col-1">{index + 1}</div>
                          <div className="col-3">
                            <label
                              htmlFor={`file${index}`}
                              className={`${styles.img_box} ${
                                !row.imgUrl && styles.add_box
                              }`}
                            >
                              {row.imgUrl ? (
                                <img src={row.imgUrl} />
                              ) : (
                                <BsPlus size="50px" color="aaa" />
                              )}
                            </label>
                          </div>
                          <div className={`${styles.input_box} col-6`}>
                            <input
                              type="file"
                              id={`file${index}`}
                              name="file"
                              className="d-none"
                              {...register(`rows[${index}].file`, {
                                onChange: (e) => handleFileChange(e, index),
                              })}
                            />
                            {errors?.rows?.[index]?.file && (
                              <p className="error-msg">
                                {errors.rows[index].file.message}
                              </p>
                            )}
                            <input
                              type="text"
                              className="form-control mb-1"
                              placeholder="배너 제목을 입력해주세요"
                              name="title"
                              {...register(`rows[${index}].title`)}
                            />
                            <input
                              type="text"
                              className="form-control"
                              placeholder="이미지 클릭 시 이동할 주소를 입력해주세요"
                              name="linkUrl"
                              {...register(`rows[${index}].linkUrl`)}
                            />
                            {errors?.rows?.[index]?.linkUrl && (
                              <p className="error-msg">
                                {errors.rows[index].linkUrl.message}
                              </p>
                            )}
                          </div>
                          <div className="col-1">
                            <input
                              type="checkbox"
                              name="useYn"
                              value="Y"
                              {...register(`rows[${index}].useYn`)}
                            />
                          </div>
                          <div className="col-1">
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => deleteBanner(index)}
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
        <div className={`${styles.btn_box} text-center w-100 mt-5`}>
          <BtnForm btnName="배너 수정" type="submit" className="btn btn-dark" />
        </div>
      </form>
    </Container>
  );
}

export default AdminBanner;
