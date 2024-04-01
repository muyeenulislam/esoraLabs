"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";

import ApiCaller from "@/config/apicaller";

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

  const [clientList, setClientList] = useState([]);
  const [page, setPage] = useState("clientSelect");
  const [clientName, setClientName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [services, setServices] = useState([]);
  const [description, setDescription] = useState("fdf sdf ");
  const [goals, setGoals] = useState(" sdfd ");
  const [targetAudience, setTargetAudience] = useState("sdf d");
  const [geographicalScope, setGeographicalScope] = useState("sdf ");
  const [maturityProjects, setMaturityProjects] = useState(" sdf ");
  const [whenProjectStart, setStartTime] = useState("fsdfds");
  const [whenProjectComplete, setWhenProjectComplete] = useState("sdfdsf");
  const [otherInfo, setOtherInfo] = useState("sdfsdf");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await ApiCaller.Get(`/auth/company`);
        setClientList(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchClientData();
  }, []);

  const handleFileListChange = (fileList) => {
    setFileList(fileList);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("clientName", clientName);
    formData.append("companyId", companyId);
    formData.append("services", JSON.stringify(services));
    formData.append("description", description);
    formData.append("goals", goals);
    formData.append("targetAudience", targetAudience);
    formData.append("geographicalScope", geographicalScope);
    formData.append("maturityProjects", maturityProjects);
    formData.append("whenProjectStart", whenProjectStart);
    formData.append("whenProjectComplete", whenProjectComplete);
    formData.append("otherInfo", otherInfo);

    if (fileList && fileList?.length > 0) {
      fileList.forEach((file) => {
        formData.append("document", file.originFileObj);
      });
    }

    const response = await ApiCaller.Post("/projects", formData);

    if (response.status === 200) {
      message.success("Project created successfully.");
      router.push("/dashboard");
    } else {
      message.error(response.data.message);
    }
  };

  return (
    <div className={styles.container}>
      <TopTitle pageName={page} />
      <Spacer height="32px" />
      <div className={styles.formContainer}>
        {page === "clientSelect" ? (
          <ClientPage
            clientList={clientList}
            clientName={clientName}
            setClientName={setClientName}
            setCompanyId={setCompanyId}
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
            maturity={maturityProjects}
            setMaturity={setMaturityProjects}
            page={page}
            setPage={setPage}
          />
        ) : page === "startDate" ? (
          <StartDate
            startTime={whenProjectStart}
            setStartTime={setStartTime}
            page={page}
            setPage={setPage}
          />
        ) : page === "endDate" ? (
          <EndDate
            deadline={whenProjectComplete}
            setDeadline={setWhenProjectComplete}
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
            fileList={fileList}
            onFileListChange={handleFileListChange}
            setFileList={setFileList}
            page={page}
            setPage={setPage}
          />
        ) : page === "review" ? (
          <Review
            clientName={clientName}
            services={services}
            description={description}
            setFileList={setFileList}
            goals={goals}
            targetAudience={targetAudience}
            geographicalScope={geographicalScope}
            maturity={maturityProjects}
            startTime={whenProjectStart}
            deadline={whenProjectComplete}
            otherInfo={otherInfo}
            fileList={fileList}
            page={page}
            setPage={setPage}
            handleSubmit={handleSubmit}
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
