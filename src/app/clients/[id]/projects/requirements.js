import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Input, Radio, Space, Typography, message, Upload } from "antd";

import truncateString from "@/utils/truncatestring";

import Spacer from "@/components/spacer/spacer";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";
import { useSearchParams } from "next/navigation";

import ApiCaller from "@/config/apicaller";

const { TextArea } = Input;
const { Text } = Typography;

const Requirements = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectid");
  const [projectdata, setProjectData] = useState({});
  const [Targetvalue, setTargetValue] = useState("");
  const [showTargetValue, setShowTargetValue] = useState(false);
  const [save, setSave] = useState(false);
  const [fileInfoList, setFileInfoList] = useState([]);
  const [showFile, setShowFile] = useState(false);
  const [geographicalvalue, setGeographicalValue] = useState("");
  const [showGeographical, setShowGeographical] = useState(false);
  const [maturityProject, setMaturityProject] = useState("");
  const [showMaturity, setShowMaturity] = useState(false);
  const [startvalue, setStartValue] = useState("");
  const [showStartDate, setShowStartDate] = useState(false);
  const [completedvalue, setCompletedValue] = useState("");
  const [showCompletionTime, setShowCompletionTime] = useState(false);
  const [mediavalue, setMediaValue] = useState(1);
  const [showMediaCost, setShowMediaCost] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [textValue, setTextValue] = useState("");
  const [id,setId] = useState("")

  // console.log("projectId",projectId);

  // Get project api call
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await ApiCaller.Get(`/projects/${projectId}`);
        const data = response?.data?.data?.project;
        // setTeams(response?.data?.data?.teams);
        if (response?.status === 200) {
          setId(data?._id)
          setProjectData(data);
          setTargetValue(data.targetAudience);
          setGeographicalValue(data.geographicalScope);
          setMaturityProject(data.maturityProjects);
          setStartValue(data?.whenProjectStart);
          setCompletedValue(data?.whenProjectComplete);
          setTextValue(data?.goals);
          setPassValue(data?.description);
          setFileInfoList(data?.document)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProjectData();
  }, [projectId]);

  console.log("projectdata", projectdata);

  // console.log("fileInfoList",fileInfoList);

  const onChange = ({ fileList: newFileList }) => {
    setFileInfoList(newFileList);
  };

  const removeFile = (file) => {
    const newFileList = fileInfoList.filter((item) => item.uid !== file.uid);
    setFileInfoList(newFileList);
  };

  const handleTextChange = (event) => {
    const newTextValue = event.target.value;
    console.log("Text entered:", newTextValue);
    setTextValue(newTextValue);
  };
  const [passValue, setPassValue] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const handlePassTextChange = (event) => {
    const newTextValue = event.target.value;
    console.log("Pass Text entered:", newTextValue);
    setPassValue(newTextValue);
  };
  const onTargetChange = (e) => {
    console.log("Target checked", e.target.value);
    setTargetValue(e.target.value);
  };
  const onGeographicalChange = (e) => {
    console.log("Geographical checked", e.target.value);
    setGeographicalValue(e.target.value);
  };
  const onMaturityProjectChange = (e) => {
    console.log("Geographical checked", e.target.value);
    setMaturityProject(e.target.value);
  };
  const onStartProjectChange = (e) => {
    console.log("Geographical checked", e.target.value);
    setStartValue(e.target.value);
  };
  const onCompletedProjectChange = (e) => {
    console.log("Geographical checked", e.target.value);
    setCompletedValue(e.target.value);
  };
  const onMediaProjectChange = (e) => {
    console.log("Geographical checked", e.target.value);
    setMediaValue(e.target.value);
  };

  const handleSave = async () => {
    setSave(true);
    setShowTargetValue(true);
    setShowGeographical(true);
    setShowMaturity(true);
    setShowStartDate(true);
    setShowCompletionTime(true);
    setShowInfo(true);
    setShowMediaCost(true);
    setShowFile(true);
    setIsEditing(false);


    try {
      // Assuming you have a URL for your API endpoint
      const url = `/projects/${id}`;
      
      // Prepare the data object with the state values
      const postData = {
        targetAudience: Targetvalue,
        geographicalScope: geographicalvalue,
        maturityProjects: maturityProject,
        whenProjectStart: startvalue,
        whenProjectComplete: completedvalue,
        goals: textValue,
        description: passValue,
        document: fileInfoList,
        mediavalue:mediavalue
        // Add any other data fields you want to include in the post request
      };
      console.log("postData",postData);
  
      // Perform the POST request
      const response = await  ApiCaller.Put(url, postData);
      
      // Handle the response as needed
      console.log('PUT request response:', response.data);
  
      // Set editing state or any other logic here
      setIsEditing(false);
    } catch (error) {
      // Handle errors
      console.error('Error while making POST request:', error);
    }






  };

  const handleEdit = () => {
    setSave(false);
    setShowTargetValue(false);
    setShowGeographical(false);
    setShowMaturity(false);
    setShowStartDate(false);
    setShowCompletionTime(false);
    setShowInfo(false);
    setShowMediaCost(false);
    setShowFile(false);
    setIsEditing(true);
  };












  return (
    <div className="border h-auto mx-[200px] mt-[24px] rounded-2xl shadow-md">
      <div className=" p-[24px] bg-[#0B132B] rounded-t-2xl"></div>
      <div className="flex justify-between px-[24px] pb-[24px]  bg-[#0B132B] ">
        <div className=" text-[#FFFFFF]">
          <div className="text-[24px] font-bold">Project Overview</div>
          <div className="text-[16px] font-normal">3 revisions remaining</div>
        </div>
        {isEditing ? (
          <div className="flex gap-4">
            <WhiteButton text={"Cancel"} onClick={() => setIsEditing(false)} />
            <YellowButton text={"Save"} onClick={handleSave} />
          </div>
        ) : (
          <div className="flex gap-4">
            <WhiteButton text={"Ask to Update"} />
            <WhiteButton text={"Edit"} onClick={handleEdit} />
          </div>
        )}
      </div>
      <div className="px-[24px] pt-[24px] pb-[24px] text-[20px] font-bold">
        <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
          What are the goals of the project?
        </div>
        <div className="truncate text-black font-sans text-xl font-bold leading-6">
          {save ? ( // Conditionally render the text content after saving
            <div className="truncate text-black font-sans text-xl font-bold leading-6">
              {textValue}
            </div>
          ) : (
            <TextArea
              rows={4}
              placeholder="Write something......."
              onChange={handleTextChange}
              value={textValue}
            />
          )}
        </div>
      </div>

      <div className="px-[24px] pt-[24px] pb-[24px] text-[20px] font-bold">
        <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
          What is the target audience?
        </div>
        <div className="truncate text-black font-sans text-xl font-bold leading-6">
          {showTargetValue ? (
            <div className="truncate text-black font-sans text-xl font-bold leading-6">
              {Targetvalue}
            </div>
          ) : (
            <>
              <Radio.Group onChange={onTargetChange} value={Targetvalue}>
                <Space direction="vertical">
                  <Radio value="Business to Business (B2B)">
                    Business to Business (B2B)
                  </Radio>
                  <Radio value="Business to Consumer (B2C)">
                    Business to Consumer (B2C)
                  </Radio>
                  <Radio value="Business to Government (B2G)">
                    Business to Government (B2G)
                  </Radio>
                  <Radio value={4}>
                    <Input
                      style={{
                        width: 300,
                      }}
                      placeholder="Other (please specify)"
                    />
                  </Radio>
                </Space>
              </Radio.Group>
            </>
          )}
        </div>
      </div>
      <div className="px-[24px] pt-[24px] pb-[24px] bg-gray-50 text-[20px] font-bold">
        <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
          What is the geographical scope?
        </div>
        {showGeographical ? (
          <div className="truncate text-black font-sans text-xl font-bold leading-6">
            {geographicalvalue}
          </div>
        ) : (
          <div className="truncate text-black font-sans text-xl font-bold leading-6">
            <Radio.Group
              onChange={onGeographicalChange}
              value={geographicalvalue}
            >
              <Space direction="vertical">
                <Radio value="Local">Local</Radio>
                <Radio value="Regional">Regional</Radio>
                <Radio value="National">National</Radio>
                <Radio value="International">International</Radio>
                <Radio value={4}>
                  <Input
                    style={{
                      width: 300,
                    }}
                    placeholder="Other (please specify)"
                  />
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        )}
      </div>

      <div className="px-[24px] pt-[24px] pb-[24px] text-[20px] font-bold">
        <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
          What is the maturity of your project?
        </div>
        {showMaturity ? (
          <div className="truncate text-black font-sans text-xl font-bold leading-6">
            {maturityProject}
          </div>
        ) : (
          <div className="truncate text-black font-sans text-xl font-bold leading-6">
            <Radio.Group
              onChange={onMaturityProjectChange}
              value={maturityProject}
            >
              <Space direction="vertical">
                <Radio value="Concept and initiation">
                  Concept and initiation <br />{" "}
                  <Text type="secondary">
                    I am still defining the project idea and main concepts
                  </Text>{" "}
                </Radio>
                <Radio value="Planning">
                  Planning <br />{" "}
                  <Text type="secondary">
                    {" "}
                    I am defining the project planning, scope and budget{" "}
                  </Text>
                </Radio>
                <Radio value="Execution">
                  Execution <br />{" "}
                  <Text type="secondary">
                    {" "}
                    I am ready to start the execution of the project{" "}
                  </Text>
                </Radio>
                <Radio value="Monitoring and update">
                  Monitoring and update <br />{" "}
                  <Text type="secondary">
                    {" "}
                    The project already started and I need extra resources{" "}
                  </Text>
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        )}
      </div>

      <div className="px-[24px] pt-[24px] pb-[24px] bg-gray-50 text-[20px] font-bold">
        <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
          When should the project start?
        </div>

        {showStartDate ? (
          <div className="truncate text-black font-sans text-xl font-bold leading-6">
            {startvalue}
          </div>
        ) : (
          <div className="truncate text-black font-sans text-xl font-bold leading-6">
            <Radio.Group onChange={onStartProjectChange} value={startvalue}>
              <Space direction="vertical">
                <Radio value="As soon as possible">As soon as possible</Radio>
                <Radio value="2-4 weeks">2-4 weeks</Radio>
                <Radio value="More than 1 month">More than 1 month</Radio>
                <Radio value="More than 3 months">More than 3 months</Radio>
                <Radio value="I do not have any start date">
                  I do not have any start date
                </Radio>
                <Radio value="Other">
                  <Input
                    style={{
                      width: 300,
                    }}
                    placeholder="Other (please specify)"
                  />
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        )}
      </div>
      <div className="px-[24px] pt-[24px] pb-[24px] text-[20px] font-bold">
        <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
          When does your project need to be completed?
        </div>
        {showCompletionTime ? (
          <div className="truncate text-black font-sans text-xl font-bold leading-6">
            {" "}
            {completedvalue}{" "}
          </div>
        ) : (
          <div className="truncate text-black font-sans text-xl font-bold leading-6">
            <Radio.Group
              onChange={onCompletedProjectChange}
              value={completedvalue}
            >
              <Space direction="vertical">
                <Radio value="Less than a month">Less than a month</Radio>
                <Radio value="1 - 3 months">1 - 3 months</Radio>
                <Radio value="3 - 6 months">3 - 6 months</Radio>
                <Radio value="6 - 12 months">6 - 12 months</Radio>
                <Radio value="More than 12 months">More than 12 months</Radio>
                <Radio value="Other">
                  <Input
                    style={{
                      width: 300,
                    }}
                    placeholder="Other (please specify)"
                  />
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        )}
      </div>

      <div className="px-[24px] pt-[24px] pb-[24px] bg-gray-50 text-[20px] font-bold">
        <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
          Does the budget cover the media costs
        </div>
        {showMediaCost ? (
          <div className="truncate text-black font-sans text-xl font-bold leading-6">
            {mediavalue}
          </div>
        ) : (
          <div className="truncate text-black font-sans text-xl font-bold leading-6">
            <Radio.Group onChange={onMediaProjectChange} value={mediavalue}>
              <Space direction="vertical">
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
                <Radio value="There is no media costs for this project">
                  There is no media costs for this project
                </Radio>
                <Radio value="Other">
                  <Input
                    style={{
                      width: 300,
                    }}
                    placeholder="Other (please specify)"
                  />
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        )}
      </div>
      <div className="px-[24px] pt-[24px] pb-[24px] text-[20px] font-bold">
        <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
          What other info should we pass along?
        </div>
        {showInfo ? (
          <div className="truncate text-black font-sans text-xl font-bold leading-6">
            {" "}
            {passValue}{" "}
          </div>
        ) : (
          <div className="truncate text-black font-sans text-xl font-bold leading-6">
            <TextArea
              rows={4}
              placeholder="Enter Info here......."
              onChange={handlePassTextChange}
              value={passValue}
            />
          </div>
        )}
      </div>
      <div className="px-[24px] pt-[24px] pb-[24px] bg-gray-50 text-[20px] font-bold">
        <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
          Do you have any briefing or relevant documents to share?
        </div>
        <div className="truncate text-black font-sans text-xl font-bold leading-6">
          <div>
            <Upload
              accept={".pdf, .doc, .docx, .png, .jpg, .gif"}
              listType="picture"
              fileList={fileInfoList}
              onChange={onChange}
              showUploadList={false}
              progress={{ strokeWidth: 2, showInfo: false }}
              className={`cursor-pointer flex justify-center items-center border border-solid border-gray-200 rounded-lg ${
                fileInfoList?.length < 5 ? "" : "opacity-45"
              }`}
              disabled={fileInfoList?.length < 5 ? false : true}
            >
              <div className="px-6 py-4 flex justify-center items-center flex-col">
                <div className="p-[10px] h-[40px] w-[40px] flex justify-center items-center rounded-full border-6 border-solid border-gray-50 bg-gray-100">
                  <Image
                    src="/images/upload-cloud.svg"
                    alt="logo"
                    height={20}
                    width={20}
                  />
                </div>
                <Spacer height="12px" />
                <p className="text-subtitleText font-normal text-[14px] m-0">
                  <strong className="text-primary">Click to upload</strong> or
                  drag and drop
                </p>
                <p className="text-subtitleText font-normal text-[12px] m-0">
                  PDF, DOC, PNG, JPG or GIF (Maximum upload size: 2MB (max. 5
                  files))
                </p>
              </div>
            </Upload>
            <Spacer height="12px" />

            {fileInfoList?.length > 0 &&
              fileInfoList?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-3 items-center border border-primary rounded-lg p-4 mb-3"
                >
                  <div className="p-2 flex justify-center items-center rounded-full bg-white border-4 border-solid border-grayBorder">
                    <Image
                      src={"/images/upload-file-icon.svg"}
                      alt={item.name}
                      height={20}
                      width={20}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <p
                      className="text-primary text-[14px] font-semibold mb-2"
                      title={item?.name}
                    >
                      {truncateString(item?.name)}
                    </p>

                    <p className="text-subtitleText text-[14px] font-normal m-0">
                      {(item.size / 1024).toFixed(2)} KB - {item?.percent}%
                      Uploaded
                    </p>
                  </div>
                  <div className="flex  gap-2">
                    <div className="p-[6px] flex justify-center items-center rounded-full bg-grayBorder">
                      <Image
                        src={"/images/download-icon.svg"}
                        alt={item.name}
                        height={26}
                        width={26}
                      />
                    </div>
                    <div className="p-[6px] flex justify-center items-center rounded-full bg-grayBorder">
                      <Image
                        src={"/images/trash-2.svg"}
                        alt={item.name}
                        height={26}
                        width={26}
                        onClick={() => removeFile(item)}
                      />
                    </div>
                  </div>
                </div>
              ))}
             
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requirements;
