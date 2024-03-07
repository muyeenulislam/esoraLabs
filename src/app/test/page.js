import React from "react";



import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import WhiteButton from "@/components/buttons/whitebutton";
import YellowButton from "@/components/buttons/yellowbutton";
const { Dragger } = Upload;




const Documents = (props) => {
  const draggerProps = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    accept: '.pdf,.doc,.docx,.png,.jpg,.jpeg,.gif',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        props.onFileListChange(info.fileList);
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  const fileList  = props;
  return (
    <>
      <div className="border-solid">
        <Dragger {...draggerProps} accept=".pdf, .doc, .png, .jpg, .gif, application/pdf, application/msword, image/png, image/jpeg, image/gif"  >
          <p className="ant-upload-drag-icon">
            <img src="/images/upload-cloud.svg" className="mx-auto w-12 h-12" alt="logo" />
          </p>
          <p className="ant-upload-text"> <strong>Click to upload</strong> or drag and drop</p>
          <p className="ant-upload-hint">
          PDF, DOC, PNG, JPG or GIF (Maximum upload size: 2MB (max. 5 files))
          </p>
        </Dragger>
      </div>
      <div>
        {fileList.map((file, index) => (
          <div key={index}>
            <p>{file.name}</p> {/* Render the name of each file */}
          </div>
        ))}
      </div>
      <div className={styles.loginContainer}>
        <WhiteButton
          text={"Previous"}
          imagealign="left"
          image={"/images/arrow-left.svg"}
          onClick={() => props?.setPage("otherInfo")}
        />
       <YellowButton
  text="Next"
  imagealign="right"
  image={"/images/arrow-right.svg"}
  // disabled={!props?.documents ? true : false}
  onClick={() => props?.setPage("review")}
>
  Next
</YellowButton>
      </div>
    </>
  );
};

export default Documents;
