"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import TopTitle from "./toptitle";
import Spacer from "@/components/spacer/spacer";

import ClientPage from "./clientpage";
import Services from "./services";

import styles from "./styles";

const Login = () => {
  const router = useRouter();

  const [page, setPage] = useState("clientSelect");
  const [clientName, setClientName] = useState("");
  const [services, setServices] = useState([]);
  const [description, setDescription] = useState("");
  const [goals, setGoals] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [geographicalScope, setGeographicalScope] = useState("");
  const [maturity, setMaturity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [deadline, setDeadline] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [documents, setDocuments] = useState(null);

  console.log(page);
  const onSubmit = () => {
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
      <TopTitle pageName={page} />
      <Spacer height="32px" />
      <div className={styles.formContainer}>
        {page === "clientSelect" ? (
          <ClientPage
            clientName={clientName}
            setClientName={setClientName}
            page={page}
            setPage={setPage}
          />
        ) : page === "services" ? (
          <Services
            services={services}
            setServices={setServices}
            page={page}
            setPage={setPage}
          />
        ) : (
          <ClientPage
            clientName={clientName}
            setClientName={setClientName}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
