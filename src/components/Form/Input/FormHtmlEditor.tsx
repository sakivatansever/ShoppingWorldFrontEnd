import { Editor, EditorTools } from "@progress/kendo-react-editor";
import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { Label, Error } from "@progress/kendo-react-labels";

// Kendo Editor Araçları
const {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  ForeColor,
  BackColor,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
  OrderedList,
  UnorderedList,
  Undo,
  Redo,
  Link,
  Unlink,
  InsertImage,
  ViewHtml,
  InsertTable,
  AddRowBefore,
  AddRowAfter,
  AddColumnBefore,
  AddColumnAfter,
  DeleteRow,
  DeleteColumn,
  DeleteTable,
  MergeCells,
  SplitCell,
} = EditorTools;

export const FormHtmlEditor = (fieldRenderProps: FieldRenderProps) => {
  const { label, id, value, onChange, validationMessage, visited } =
    fieldRenderProps;
  return (
    <FieldWrapper>
      <Label editorId={id}>{label}</Label>
      <Editor
        value={value || ""} // Form state ile senkronize
        onChange={(e) => onChange({ value: e.html })} // Form içindeki değeri güncelle
        tools={[
          [Bold, Italic, Underline, Strikethrough],
          [Subscript, Superscript],
          [ForeColor, BackColor],
          [AlignLeft, AlignCenter, AlignRight, AlignJustify],
          [Indent, Outdent],
          [OrderedList, UnorderedList],
          [Undo, Redo],
          [Link, Unlink, InsertImage],
          [ViewHtml],
          [InsertTable],
          [AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter],
          [DeleteRow, DeleteColumn, DeleteTable],
          [MergeCells, SplitCell],
        ]}
        contentStyle={{ height: 200 }}
      />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </FieldWrapper>
  );
};