"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import TopTitle from "./toptitle";
import Spacer from "@/components/spacer/spacer";

import ClientPage from "./clientpage";
import Services from "./services";
import Description from "./description";
import Goals from "./goals";
import TargetAudience from "./targetaudience";
import GeographicalScope from "./geographicalscope";
import Maturity from "./maturity";
import StartDate from "./startdate";
import EndDate from "./enddate";
import OtherInfo from "./otherinfo";
import Documents from "./documents";
import Review from "./review";

import styles from "./styles";

const Login = () => {
  const router = useRouter();

  const [page, setPage] = useState("clientSelect");
  const [clientName, setClientName] = useState("");
  const [services, setServices] = useState("");
  const [description, setDescription] = useState("");
  const [goals, setGoals] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [geographicalScope, setGeographicalScope] = useState("");
  const [maturity, setMaturity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [deadline, setDeadline] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [documents, setDocuments] = useState(null);

  console.log(services);
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
        ) : page === "description" ? (
          <Description
            description={description}
            setDescription={setDescription}
            page={page}
            setPage={setPage}
          />
        ) : page === "goals" ? (
          <Goals
            goals={goals}
            setGoals={setGoals}
            page={page}
            setPage={setPage}
          />
        ) : page === "targetAudience" ? (
          <TargetAudience
            targetAudience={targetAudience}
            setTargetAudience={setTargetAudience}
            page={page}
            setPage={setPage}
          />
        ) : page === "geographicalScope" ? (
          <GeographicalScope
            geographicalScope={geographicalScope}
            setGeographicalScope={setGeographicalScope}
            page={page}
            setPage={setPage}
          />
        ) : page === "maturity" ? (
          <Maturity
            maturity={maturity}
            setMaturity={setMaturity}
            page={page}
            setPage={setPage}
          />
        ) : page === "startDate" ? (
          <StartDate
            startTime={startTime}
            setStartTime={setStartTime}
            page={page}
            setPage={setPage}
          />
        ) : page === "endDate" ? (
          <EndDate
            deadline={deadline}
            setDeadline={setDeadline}
            page={page}
            setPage={setPage}
          />
        ) : page === "otherInfo" ? (
          <OtherInfo
            otherInfo={otherInfo}
            setOtherInfo={setOtherInfo}
            page={page}
            setPage={setPage}
          />
        ) : page === "documents" ? (
          <Documents
            documents={documents}
            setDocuments={setDocuments}
            page={page}
            setPage={setPage}
          />
        ) : page === "review" ? (
          <Review
            clientName={clientName}
            services={services}
            description={description}
            goals={goals}
            targetAudience={targetAudience}
            geographicalScope={geographicalScope}
            maturity={maturity}
            startTime={startTime}
            deadline={deadline}
            otherInfo={otherInfo}
            documents={documents}
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
