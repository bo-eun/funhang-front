import React, { useEffect, useRef, useState } from 'react';
import mapMarkerIcon from "../../assets/img/map_marker_icon.svg";
import "../../assets/css/map.css";

const KAKAO_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

function Map({ chainName, searchText = "", setList, height }) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [myLocation, setMyLocation] = useState({});
  const mapInstance = useRef(null);
  const clustererRef = useRef(null);
  const [dataList, setDataList] = useState([]);
  const currentInfowindow = useRef(null);

  // 현재 위치 가져오기
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("위치 정보를 지원하지 않는 브라우저입니다.");
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
        setMyLocation({});
      }
    );
  }, []);

  // Kakao 지도 SDK 로드 및 지도 초기화
  useEffect(() => {
    if (!myLocation.latitude || !myLocation.longitude || mapInstance.current) return;

    // SDK 이미 로드된 경우
    if (window.kakao && window.kakao.maps) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services,clusterer`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        initMap();
      });
    };

    // cleanup (중복 삽입 방지)
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [myLocation]);

  // 지도 초기화 함수
  const initMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(myLocation.latitude, myLocation.longitude),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
    mapInstance.current = map;

    // 클러스터러 생성 (검색 시 재활용)
    clustererRef.current = new window.kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 10,
    });

    setMapLoaded(true);
  };

  // 검색 및 마커 표시 (지도 준비된 후)
  useEffect(() => {
    if (!mapLoaded || !window.kakao || !mapInstance.current) return;

    const ps = new window.kakao.maps.services.Places();
    const location = new window.kakao.maps.LatLng(myLocation.latitude, myLocation.longitude);
    const clusterer = clustererRef.current;

    // 이전 마커 초기화
    if (clusterer) {
      clusterer.clear();
    }

    const markers = [];

    // 지도 옵션. 검색어가 있을 때 검색어에 맞게 지도 이동, 아니면 내 위치로 이동
    const options = searchText.trim() ? undefined : { location, radius: 1000 };

    const search = (keyword, isLast = false) => {
      ps.keywordSearch(keyword, (data, status) => {
        if(isLast && status === window.kakao.maps.services.Status.ZERO_RESULT) {
          alert('검색 결과가 없습니다.')
          return;
        }

        if (status !== window.kakao.maps.services.Status.OK) return;

        // 검색어가 있을 경우 첫 번째 검색 결과를 중심으로 지도 이동
        if (searchText.trim() && data.length > 0) {
          const firstPlace = data[0];
          const newCenter = new window.kakao.maps.LatLng(firstPlace.y, firstPlace.x);
          mapInstance.current.setCenter(newCenter);
        }

        setDataList([]);
          
        data.forEach((place) => {
          const markerImage = new window.kakao.maps.MarkerImage(
            mapMarkerIcon,
            new window.kakao.maps.Size(20, 20),
            {
              offset: new window.kakao.maps.Point(10, 20),
            }
          );

          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(place.y, place.x),
            image: markerImage,
          });

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `
              <div class="info_marker">
                <p>${place.place_name}</p>
                <span>${place.phone || ""}</span>
              </div>
            `,
          });

          // 인포윈도우 열기
          window.kakao.maps.event.addListener(marker, "mouseover", () => {
            infowindow.open(mapInstance.current, marker);
            currentInfowindow.current = infowindow;
  
            const infoTitle = document.querySelector('.info_marker');

            var w = infoTitle.offsetWidth + 4;

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
          });

          markers.push(marker);
        

          // 마우스 떠났을 때 닫기
          window.kakao.maps.event.addListener(marker, "mouseout", () => {
            if (currentInfowindow.current) {
              currentInfowindow.current.close();
            }
          });          

          setDataList(prev => [...prev, place]);
        });

        clusterer.addMarkers(markers);
        setList();
      }, options);
    };

    // 검색 실행
    if (chainName === "all") {
      ["cu", "gs25", "세븐일레븐"].forEach((chain) => {
        search(`${searchText} ${chain}`);
      });
    } else {
      search(`${searchText} ${chainName}`, true);
    }

  }, [mapLoaded, chainName, searchText]);


  useEffect(() => {
    if(dataList.length > 0) {

    // 거리순 + category_name 에 편의점 종류를 저장
    const sortedList = dataList.map((data) => {
      const arr = data.category_name.split(' > ');
      data.category_name = arr[arr.length - 1];
      return {...data, category_name: data.category_name}
    }).sort((a, b) => (a.distance * 1) - (b.distance * 1));

    setList(sortedList);
    console.log(sortedList);
    }
  }, [dataList, setList])


  return <div id="map" style={{ width: "100%", height: height }}></div>;
}

export default Map;
