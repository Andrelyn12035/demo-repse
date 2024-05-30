'use client';
import * as React from "react";
import { useState } from "react";
import { CreateInvoice } from "./buttons";
interface UploaderProps {
  fileType?: string | AcceptedFileType[];
}

enum AcceptedFileType {
  Text = ".txt",
  Gif = ".gif",
  Jpeg = ".jpg",
  Png = ".png",
  Doc = ".doc",
  Pdf = ".pdf",
  AllImages = "image/*",
  AllVideos = "video/*",
  AllAudios = "audio/*"
}

export const Upload = (props: UploaderProps) => {
  const { fileType } = props;
  const acceptedFormats: string | AcceptedFileType[] =
    typeof fileType === "string" ? fileType : Array.isArray(fileType)
      ? fileType?.join(",")
      : AcceptedFileType.Text;
  const [selectedFiles, setSelectedFiles] = useState<File | undefined>(
    undefined
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event?.target?.files?.[0]);
    console.log(event?.target?.files?.[0]);
  };

  const onUpload = () => {
    console.log(selectedFiles);
  };

  return (
    <>
        <input
          
          type="file"
          accept={".pdf, .png"}
          onChange={handleFileSelect}
        />
        {selectedFiles?.name && (
          <>
            <span style={{ float: "left" }}> {selectedFiles?.name}</span>
            <span style={{ padding: "10px" }}> Change</span>
            <span onClick={(e) => { e.preventDefault(); setSelectedFiles(undefined); }}>Clear</span>
          </>
        )}
    </>
  );
};