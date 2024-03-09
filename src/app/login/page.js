"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles";
import {  message } from 'antd';
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const onSubmit = async () => {
    if (!email) {
      setErrorEmail("Email is required");
    } else if (!password) {
      setErrorPassword("Password is required");
    } else {
      const data = {email, password}
      console.log("Data",data);
      try {
        const apiUrl = "https://api.esoralabs.com/api/v1/auth/login?=";
  
        const response = await axios.post(apiUrl, data);
  
        router.push("/dashboard");
        messageApi.open({
          type: "success",
          content: "Created a new project successfully!",
        });
      } catch (error) {
        console.error("Error create project:", error);
        messageApi.open({
          type: "error",
          content: "Failed to create new project!",
        });
      }
   
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>Admin Login</div>
      <div className={styles.formContainer}>
        <div>
          <div className="mb-[20px]">
            <div className={styles.labelStyle}>User Name or Email</div>
            <div>
              <input
                className={styles.inputStyle}
                type="email"
                value={email}
                onChange={(e) => {
                  setErrorEmail("");
                  setEmail(e.target.value);
                }}
                required
                placeholder="e. g. johndoe"
              />
            </div>
            {errorEmail && <div className={styles.errorText}>{errorEmail}</div>}
          </div>
          <div className="mb-[20px]">
            <div className={styles.labelStyle}>Password</div>
            <div>
              <input
                className={styles.inputStyle}
                type="password"
                value={password}
                onChange={(e) => {
                  setErrorPassword("");
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            {errorPassword && (
              <div className={styles.errorText}>{errorPassword}</div>
            )}
          </div>
          <div className={styles.checkboxContainer}>
            <div className={styles.justifyCenterItemsCenter}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className={styles.checkbox}
              />
            </div>
            <div className={styles.loginText}>Keep me logged in</div>
          </div>
        </div>
        <div className={styles.loginContainer}>
          <button className={styles.loginButton} onClick={onSubmit}>
            <div className={styles.loginText}>Log in</div>
            <img src="/images/arrow-right.svg" alt="logo" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
