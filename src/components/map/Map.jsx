import React, { useEffect, useMemo, useRef, useState } from 'react';
import mapMarkerIcon from "../../assets/img/map_marker_icon.svg";
import "../../assets/css/map.css";

const KAKAO_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;


function Map({ chainName, searchText="", height }) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [myLocation, setMyLocation] = useState({});
  const mapInstance = useRef(null);

  // 현재 열린 infowindow 저장
  let currentInfowindow = null;

  useEffect(() => {
    // 내 위치 가져오기
    if(!navigator.geolocation) {
      alert('위치 정보를 지원하지 않는 브라우저입니다.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        console.log(err.message);
        setMyLocation({})
      }
    );    

  }, [])

  useEffect(() => {
    
    if(!myLocation.latitude || myLocation.LatLng) return; // 위치가 없으면 실행 안함


    // kakaoKey 변수를 사용하여 script 태그를 넣기 위해 아래와 같이 처리함
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services,clusterer`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(myLocation.latitude, myLocation.longitude),
          level: 3,
        };

        // 맵 객체 변수에 저장
        mapInstance.current = new window.kakao.maps.Map(container, options);

        const map = new window.kakao.maps.Map(container, options);

        const ps = new window.kakao.maps.services.Places();
        const location = new window.kakao.maps.LatLng(myLocation.latitude, myLocation.longitude);

        
        const markers = []; // 검색 마커 저장
        const search = (chainName) => {

          const placesSearchCB = (data, status, pagination) => {

              if(status === window.kakao.maps.services.Status.OK) {

                data.forEach((place) => {

                  var icon = new window.kakao.maps.MarkerImage(
                      mapMarkerIcon,
                      new window.kakao.maps.Size(20, 20),
                      {
                          offset: new window.kakao.maps.Point(16, 34),
                          alt: "마커 이미지",
                          shape: "poly",
                          coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
                      }
                  );              

                  // 마커 생성
                  const marker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(place.y, place.x),
                    image: icon
                  });
                  markers.push(marker);

                  const infowindow = new window.kakao.maps.InfoWindow({
                    content: `<div class="info_marker"">
                              <p>${place.place_name}</p>
                              <span>${place.phone}</span>
                            </div>`,
                    removable: true
                  })


                  window.kakao.maps.event.addListener(marker, 'click', () => {
                      // 이전 클릭 시 보여진 창 닫기
                      if (currentInfowindow) {
                          currentInfowindow.close();
                      }
                      
                      infowindow.open(map, marker);
                      currentInfowindow = infowindow;

                      const infoTitle = document.querySelector('.info_marker');

                      var w = infoTitle.offsetWidth + 30;

                      // infowindow 부모 css 수정
                      // 처음 width값 저장하여 적용함
                      const originWidth = infoTitle.parentElement.dataset.width ? 
                                          infoTitle.parentElement.dataset.width :  
                                          w+'px';
                      infoTitle.parentElement.dataset.width = originWidth;
                      infoTitle.parentElement.style.width = originWidth;
                      infoTitle.parentElement.previousSibling.style.display = "none";
                      infoTitle.parentElement.parentElement.style.border = "0px";
                      infoTitle.parentElement.parentElement.style.background = "unset";          
                  })

                })

                // 마커 객체 생성
                const clusterer = new window.kakao.maps.MarkerClusterer({
                  map: map,
                  averageCenter: true,
                  minLevel: 10
                })
                clusterer.addMarkers(markers);


                // // 정상적으로 검색이 완료됐으면
                // // 검색 목록과 마커를 표출합니다
                // displayPlaces(data);

                // // 페이지 번호를 표출합니다
                // displayPagination(pagination);
              }
          }

          ps.keywordSearch(chainName, placesSearchCB, {location: location, radius: 1000})
        };




        // 편의점 검색
        // 전체 검색(CU, GS25, 세븐일레븐) 일 때 
        if(chainName === 'all') {
          const allchain = ["cu", "gs25", "세븐일레븐"];
          allchain.forEach((chain) => {
            search(`${chainName}`);
          })
        } else {
          search(`${chainName}`);
        }


        setMapLoaded(true);

      });
    };

  }, [myLocation]);


  useEffect(() => {
    if (!mapLoaded || !window.kakao || !mapInstance.current) return;

    const ps = new window.kakao.maps.services.Places();
    console.log(mapInstance)
    // ps.keywordSearch( searchText, placesSearchCB); 
    // ps.keywordSearch(searchText, (data, status) => {
    //   if (status === window.kakao.maps.services.Status.OK) {
    //     const firstPlace = data[0];
    //     const newCenter = new window.kakao.maps.LatLng(firstPlace.y, firstPlace.x);

    //     // 지도 옵션 변경
    //     mapInstance.current.setCenter(newCenter);
    //     mapInstance.current.setLevel(4); // 필요시 확대/축소
    //   }
    // });
  }, [searchText, mapLoaded]);
  
  return <div id="map" style={{ width: "100%", height: height }}></div>;
}

export default Map;