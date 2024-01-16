"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const onSubmit = (e) => {
    if (!email) {
      setErrorEmail("Email is required");
    } else if (!password) {
      setErrorPassword("Password is required");
    } else {
      router.push("/dashboard");
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
            <div className={styles.loginText}>Login</div>
            <img src="/images/arrowRight.svg" alt="logo" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
