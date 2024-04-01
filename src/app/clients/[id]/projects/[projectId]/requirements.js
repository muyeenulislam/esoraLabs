import React, { useState } from "react";
import { Input, Radio, Space, Typography, message, Upload } from "antd";
import YellowButton from "@/components/buttons/yellowbutton";
import WhiteButton from "@/components/buttons/whitebutton";
const { TextArea } = Input;
const { Text } = Typography;
const { Dragger } = Upload;

const Requirements = () => {
  const [value, setValue] = useState([]);
  const [Targetvalue, setTargetValue] = useState(1);
  const [showTargetValue, setShowTargetValue] = useState(false);
  const [save, setSave] = useState(false);

  const [geographicalvalue, setGeographicalValue] = useState(1);
  const [showGeographical, setShowGeographical] = useState(false);
  const [maturityProject, setMaturityProject] = useState(1);
  const [showMaturity, setShowMaturity] = useState(false);
  const [startvalue, setStartValue] = useState(1);
  const [showStartDate, setShowStartDate] = useState(false);
  const [completedvalue, setCompletedValue] = useState(1);
  const [showCompletionTime, setShowCompletionTime] = useState(false);
  const [mediavalue, setMediaValue] = useState(1);
  const [showMediaCost, setShowMediaCost] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [textValue, setTextValue] = useState("");

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

  const handleSave = () => {
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
  };
  const [fileInfo, setFileInfo] = useState(null);
  const [fileInfoList, setFileInfoList] = useState([]);
  const [showFile, setShowFile] = useState(false);

  const draggerProps = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    accept: ".pdf,.doc,.docx,.png,.jpg,.jpeg,.gif",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        const updatedList = info.fileList.map((file) => ({
          name: file.name,
          size: file.size,
        }));
        setFileInfoList(updatedList);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
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

  // console.log("Image", fileInfoList);
  return <div>requirements</div>;
  //   return (
  //     <div className="border h-auto mx-[200px] mt-[24px] rounded-2xl shadow-md">
  //       <div className=" p-[24px] bg-[#0B132B] rounded-t-2xl"></div>
  //       <div className="flex justify-between px-[24px] pb-[24px]  bg-[#0B132B] ">
  //         <div className=" text-[#FFFFFF]">
  //           <div className="text-[24px] font-bold">Project Overview</div>
  //           <div className="text-[16px] font-normal">3 revisions remaining</div>
  //         </div>
  //         {isEditing ? (

  //        <div className="flex gap-4">
  //        <WhiteButton text={"Cancel"} onClick={() => setIsEditing(false)} />
  //        <YellowButton text={"Save"} onClick={handleSave} />
  //      </div>
  //    ) : (
  //      <div className="flex gap-4">
  //        <WhiteButton text={"Ask to Update"} />
  //        <WhiteButton text={"Edit"} onClick={handleEdit} />
  //      </div>

  //       )}
  //       </div>
  //       <div className="px-[24px] pt-[24px] pb-[24px] text-[20px] font-bold">
  //         <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
  //           What are the goals of the project?
  //         </div>
  //         <div className="truncate text-black font-sans text-xl font-bold leading-6">
  //           {save ? ( // Conditionally render the text content after saving
  //             <div className="truncate text-black font-sans text-xl font-bold leading-6">
  //               {textValue}
  //             </div>
  //           ) : (
  //             <TextArea
  //               rows={4}
  //               placeholder="Write something......."
  //               onChange={handleTextChange}
  //             />
  //           )}
  //         </div>
  //       </div>

  //       <div className="px-[24px] pt-[24px] pb-[24px] text-[20px] font-bold">
  //         <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
  //           What is the target audience?
  //         </div>
  //         <div className="truncate text-black font-sans text-xl font-bold leading-6">
  //           {showTargetValue ? (
  //             <div className="truncate text-black font-sans text-xl font-bold leading-6">
  //               {Targetvalue}
  //             </div>
  //           ) : (
  //             <>
  //               <Radio.Group onChange={onTargetChange} value={Targetvalue}>
  //                 <Space direction="vertical">
  //                   <Radio value="Business to Business (B2B)">
  //                     Business to Business (B2B)
  //                   </Radio>
  //                   <Radio value="Business to Consumer (B2C)">
  //                     Business to Consumer (B2C)
  //                   </Radio>
  //                   <Radio value="Business to Government (B2G)">
  //                     Business to Government (B2G)
  //                   </Radio>
  //                   <Radio value={4}>
  //                     <Input
  //                       style={{
  //                         width: 300,
  //                       }}
  //                       placeholder="Other (please specify)"
  //                     />
  //                   </Radio>
  //                 </Space>
  //               </Radio.Group>
  //             </>
  //           )}
  //         </div>
  //       </div>
  //       <div className="px-[24px] pt-[24px] pb-[24px] bg-gray-50 text-[20px] font-bold">
  //         <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
  //           What is the geographical scope?
  //         </div>
  //         {showGeographical ? (
  //           <div className="truncate text-black font-sans text-xl font-bold leading-6">
  //             {geographicalvalue}
  //           </div>
  //         ) : (
  //           <div className="truncate text-black font-sans text-xl font-bold leading-6">
  //             <Radio.Group
  //               onChange={onGeographicalChange}
  //               value={geographicalvalue}
  //             >
  //               <Space direction="vertical">
  //                 <Radio value="Local">Local</Radio>
  //                 <Radio value="Regional">Regional</Radio>
  //                 <Radio value="National">National</Radio>
  //                 <Radio value="International">International</Radio>
  //                 <Radio value={4}>
  //                   <Input
  //                     style={{
  //                       width: 300,
  //                     }}
  //                     placeholder="Other (please specify)"
  //                   />
  //                 </Radio>
  //               </Space>
  //             </Radio.Group>
  //           </div>
  //         )}
  //       </div>

  //       <div className="px-[24px] pt-[24px] pb-[24px] text-[20px] font-bold">
  //         <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
  //           What is the maturity of your project?
  //         </div>
  //         {showMaturity ? (
  //           <div className="truncate text-black font-sans text-xl font-bold leading-6">
  //             {maturityProject}
  //           </div>
  //         ) : (
  //           <div className="truncate text-black font-sans text-xl font-bold leading-6">
  //             <Radio.Group
  //               onChange={onMaturityProjectChange}
  //               value={maturityProject}
  //             >
  //               <Space direction="vertical">
  //                 <Radio value="Concept and initiation">
  //                   Concept and initiation <br />{" "}
  //                   <Text type="secondary">
  //                     I am still defining the project idea and main concepts
  //                   </Text>{" "}
  //                 </Radio>
  //                 <Radio value="Planning">
  //                   Planning <br />{" "}
  //                   <Text type="secondary">
  //                     {" "}
  //                     I am defining the project planning, scope and budget{" "}
  //                   </Text>
  //                 </Radio>
  //                 <Radio value="Execution">
  //                   Execution <br />{" "}
  //                   <Text type="secondary">
  //                     {" "}
  //                     I am ready to start the execution of the project{" "}
  //                   </Text>
  //                 </Radio>
  //                 <Radio value="Monitoring and update">
  //                   Monitoring and update <br />{" "}
  //                   <Text type="secondary">
  //                     {" "}
  //                     The project already started and I need extra resources{" "}
  //                   </Text>
  //                 </Radio>
  //               </Space>
  //             </Radio.Group>
  //           </div>
  //         )}
  //       </div>

  //       <div className="px-[24px] pt-[24px] pb-[24px] bg-gray-50 text-[20px] font-bold">
  //         <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
  //           When should the project start?
  //         </div>

  //         {showStartDate ? (
  //           <div className="truncate text-black font-sans text-xl font-bold leading-6">
  //             {startvalue}
  //           </div>
  //         ) : (
  //           <div className="truncate text-black font-sans text-xl font-bold leading-6">
  //             <Radio.Group onChange={onStartProjectChange} value={startvalue}>
  //               <Space direction="vertical">
  //                 <Radio value="As soon as possible">As soon as possible</Radio>
  //                 <Radio value="2-4 weeks">2-4 weeks</Radio>
  //                 <Radio value="More than 1 month">More than 1 month</Radio>
  //                 <Radio value="More than 3 months">More than 3 months</Radio>
  //                 <Radio value="I do not have any start date">
  //                   I do not have any start date
  //                 </Radio>
  //                 <Radio value="Other">
  //                   <Input
  //                     style={{
  //                       width: 300,
  //                     }}
  //                     placeholder="Other (please specify)"
  //                   />
  //                 </Radio>
  //               </Space>
  //             </Radio.Group>
  //           </div>
  //         )}
  //       </div>
  //       <div className="px-[24px] pt-[24px] pb-[24px] text-[20px] font-bold">
  //         <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
  //           When does your project need to be completed?
  //         </div>
  //         {showCompletionTime ? (
  //           <div className="truncate text-black font-sans text-xl font-bold leading-6">
  //             {" "}
  //             {completedvalue}{" "}
  //           </div>
  //         ) : (
  //           <div className="truncate text-black font-sans text-xl font-bold leading-6">
  //             <Radio.Group
  //               onChange={onCompletedProjectChange}
  //               value={completedvalue}
  //             >
  //               <Space direction="vertical">
  //                 <Radio value="Less than a month">Less than a month</Radio>
  //                 <Radio value="1 - 3 months">1 - 3 months</Radio>
  //                 <Radio value="3 - 6 months">3 - 6 months</Radio>
  //                 <Radio value="6 - 12 months">6 - 12 months</Radio>
  //                 <Radio value="More than 12 months">More than 12 months</Radio>
  //                 <Radio value="Other">
  //                   <Input
  //                     style={{
  //                       width: 300,
  //                     }}
  //                     placeholder="Other (please specify)"
  //                   />
  //                 </Radio>
  //               </Space>
  //             </Radio.Group>
  //           </div>
  //         )}
  //       </div>

  //       <div className="px-[24px] pt-[24px] pb-[24px] bg-gray-50 text-[20px] font-bold">
  //         <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
  //           Does the budget cover the media costs
  //         </div>
  //         {showMediaCost ? (
  //           <div className="truncate text-black font-sans text-xl font-bold leading-6">
  //             {mediavalue}
  //           </div>
  //         ) : (
  //           <div className="truncate text-black font-sans text-xl font-bold leading-6">
  //             <Radio.Group onChange={onMediaProjectChange} value={mediavalue}>
  //               <Space direction="vertical">
  //                 <Radio value="Yes">Yes</Radio>
  //                 <Radio value="No">No</Radio>
  //                 <Radio value="There is no media costs for this project">
  //                   There is no media costs for this project
  //                 </Radio>
  //                 <Radio value="Other">
  //                   <Input
  //                     style={{
  //                       width: 300,
  //                     }}
  //                     placeholder="Other (please specify)"
  //                   />
  //                 </Radio>
  //               </Space>
  //             </Radio.Group>
  //           </div>
  //         )}
  //       </div>
  //       <div className="px-[24px] pt-[24px] pb-[24px] text-[20px] font-bold">
  //         <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
  //           What other info should we pass along?
  //         </div>
  //         {showInfo ? (
  //           <div className="truncate text-black font-sans text-xl font-bold leading-6">
  //             {" "}
  //             {passValue}{" "}
  //           </div>
  //         ) : (
  //           <div className="truncate text-black font-sans text-xl font-bold leading-6">
  //             <TextArea
  //               rows={4}
  //               placeholder="Enter Info here......."
  //               onChange={handlePassTextChange}
  //             />
  //           </div>
  //         )}
  //       </div>
  //       <div className="px-[24px] pt-[24px] pb-[24px] bg-gray-50 text-[20px] font-bold">
  //         <div className="text-black font-sans pb-[12px] text-base font-normal leading-5">
  //           Do you have any briefing or relevant documents to share?
  //         </div>
  //         <div className="truncate text-black font-sans text-xl font-bold leading-6">

  //         {showFile ?(
  //           <div className="flex flex-col items-start gap-10  self-stretch py-4">
  //             {fileInfoList.map((file, index) => (
  //               <div key={index} className="flex flex-col items-start gap-2 w-full border border-solid border-gray-900 bg-white rounded-md">
  //                 <div className="m-4">
  //                 <div className="font-bold text-gray-900"  style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px", lineHeight: "20px" }}>Name: {file.name}</div>
  //                 <div className="font-normal text-gray-700" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px", lineHeight: "18px" }}>Size: {(file.size / 1024).toFixed(2)} KB</div>
  //                 </div>

  //               </div>
  //             ))}
  //           </div>
  //         ):(

  // <div className="border-solid">
  //             <Dragger
  //               {...draggerProps}
  //               accept=".pdf, .doc, .png, .jpg, .gif, application/pdf, application/msword, image/png, image/jpeg, image/gif"
  //             >
  //               <p className="ant-upload-drag-icon">
  //                 <img
  //                   src="/images/upload-cloud.svg"
  //                   className="mx-auto w-12 h-12"
  //                   alt="logo"
  //                 />
  //               </p>
  //               <p className="ant-upload-text">
  //                 {" "}
  //                 <strong>Click to upload</strong> or drag and drop
  //               </p>
  //               <p className="ant-upload-hint">
  //                 PDF, DOC, PNG, JPG or GIF (Maximum upload size: 2MB (max. 5
  //                 files))
  //               </p>
  //             </Dragger>
  //           </div>
  //         )}

  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default Requirements;
