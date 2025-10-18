import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { Hint, Label, Error } from "@progress/kendo-react-labels";
import {
  Upload,
  UploadOnAddEvent,
  UploadOnRemoveEvent,
} from "@progress/kendo-react-upload";
import { useState } from "react";
import { toBase64 } from "../../../guard/kendo/fileConvert";
import { Button } from "@progress/kendo-react-buttons";
import { xIcon } from "@progress/kendo-svg-icons";

export const FormUpload = (fieldRenderProps: FieldRenderProps) => {
  const {
    value,
    id,
    optional,
    label,
    hint,
    validationMessage,
    touched,
    name, // 📌 `name` ekledik, `onChange`'de kullanacağız
    ...others
  } = fieldRenderProps;

  const [files, setFiles] = useState(value || []);

  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : "";
  const errorId = showValidationMessage ? `${id}_error` : "";
  const labelId = label ? `${id}_label` : "";

  const onAddHandler = async (event: UploadOnAddEvent) => {
    const uploadedFiles = await Promise.all(
      event.newState.map(async (fileState) => {
        if (fileState.getRawFile) {
          const base64 = await toBase64(fileState.getRawFile());
          return { name: fileState.name, base64 }; // 🔥 Sadece `name` ve `base64`
        }
        return null; // Eğer dosya geçerli değilse null döndür
      })
    );

    const filteredFiles = uploadedFiles.filter((file) => file !== null);

    setFiles(filteredFiles);

    // 📌 `onChange` fonksiyonuna uygun formatta nesne gönderiyoruz
    fieldRenderProps.onChange({
      target: { name: name },
      value: uploadedFiles,
    });
  };

  const onRemoveHandler = (event: UploadOnRemoveEvent) => {
    const updatedFiles = event.newState;
    setFiles(updatedFiles);

    // 📌 `onChange` fonksiyonuna uygun formatta nesne gönderiyoruz
    fieldRenderProps.onChange({
      target: { name: name },
      value: updatedFiles,
    });
  };
  return (
    <FieldWrapper style={{ margin: "0px" }}>
      <Label
        id={labelId}
        editorId={id}
        optional={optional}
        className="k-form-label"
      >
        {label}
      </Label>
      <div className="k-form-field-wrap">
        <Upload
          id={id}
          autoUpload={false}
          showActionButtons={false}
          multiple={false}
          files={files}
          onAdd={onAddHandler}
          onRemove={onRemoveHandler}
          ariaDescribedBy={`${hintId} ${errorId}`}
          ariaLabelledBy={labelId}
          {...others}
          listItemUI={(props) => {
            const files = props.files || [];

            return (
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {files.map((file: any, index: number) => {
                  const previewUrl = file.base64
                    ? `data:image/*;base64,${file.base64}`
                    : file.url;

                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "4px 8px",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <a
                        href={previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={previewUrl}
                          alt={file.name}
                          style={{
                            width: "48px",
                            height: "48px",
                            objectFit: "cover",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            cursor: "pointer",
                          }}
                        />
                      </a>
                      <span>{file.name}</span>
                      {/* Silme butonu */}
                      <Button
                        type="button"
                        themeColor="error"
                        size="small"
                        fillMode="flat"
                        onClick={() => {
                          const newFiles = files.filter(
                            (f: any) => f.name !== file.name
                          );
                          setFiles(newFiles);
                          fieldRenderProps.onChange({
                            target: { name: fieldRenderProps.name },
                            value: newFiles,
                          });
                        }}
                        svgIcon={xIcon}
                        aria-label="Sil"
                        title="Sil"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  );
                })}
              </div>
            );
          }}
        />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && (
          <Error id={errorId}>{validationMessage}</Error>
        )}
      </div>
    </FieldWrapper>
  );
};