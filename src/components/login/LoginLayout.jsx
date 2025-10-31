import React from "react";
import styles from "../../assets/css/login.module.css";
import { Outlet, useMatches } from "react-router";

function LoginLayout() {
    const matches = useMatches();
    const current = matches[matches.length - 1];
    const title = current.handle?.title || "";
    return (
        <div className={styles.login_bg}>
            <div className={styles.login_wrap}>
                <span className="page_title">{title}</span>

                <Outlet />
            </div>
        </div>
    );
}

export default LoginLayout;
