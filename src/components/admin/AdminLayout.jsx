import React from "react";
import styles from "../../assets/css/boardList.module.css";
import { Outlet, useMatches } from "react-router";

function AdminLayout(props) {
    const matches = useMatches();
    const current = matches[matches.length - 1];
    const title = current.handle?.title || "";
    return (
        <div className={styles.board_list_bg}>
            <div className={styles.board_list_wrap}>
                <span className="page_title">{title}</span>
                <Outlet /> 
            </div>
        </div>
    );
}

export default AdminLayout;
