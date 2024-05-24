"use client";

import { UserContext } from "@/app/providers";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import React, { useContext } from "react";

const Navigation = () => {
  const { userData, clearUserData } = useContext(UserContext);
  const router = useRouter();

  function onLoginButton() {
    router.push("/login");
  }

  function onLogoutButton() {
    clearUserData();
    router.push("/");
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link href={userData[0]?.type === "admin" ? "/admin" : "/"}>
            <a className="title">취하자</a>
          </Link>
        </div>

        <div className="navbar-content">
          <div className="navbar-item">
            {userData.length > 0 ? (
              <button className="button" onClick={onLogoutButton}>
                로그아웃
              </button>
            ) : (
              <button className="button" onClick={onLoginButton}>
                로그인
              </button>
            )}
          </div>
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: #FFA07A; ## ADD8E6, ADFF2F,FFA07A 
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          height: 120px
        }
        .navbar-brand .title {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
        }
        .navbar-content {
          display: flex;
        }
        .navbar-item {
          margin-left: 20px;
        }
        .button {
          padding: 10px 20px;
          border: none;
          background-color: transparent;
          border: 2px solid white;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s;
        }
        .button:hover {
          background-color: #06f;
          color: white;
        }
      `}</style>
    </>
  );
};

export default Navigation;
