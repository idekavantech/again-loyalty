import { Editor } from "@tinymce/tinymce-react";
import { memo, useEffect, useRef, useState } from "react";
import Modal from "@saas/components/Modal";
import Button from "@material-ui/core/Button";
import { removeFile, uploadFile } from "@saas/stores/global/actions";
import { compose } from "redux";
import { connect } from "react-redux";

const imageHandler = (_uploadFile) => {
  return new Promise((res) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      _uploadFile([file], "richtext", (url) => {
        res(url);
      });
    };
  });
};
const mediaHandler = (_uploadFile) => {
  return new Promise((res) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      _uploadFile([file], "richtext", (url) => {
        res(url);
      });
    };
  });
};

const FieldRichText = ({
  _uploadFile,
  _setValue,
  label,
  value,
  edit_button_text,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [initialValue, setInitialValue] = useState(null);

  const editorRef = useRef(null);

  useEffect(() => {
    if (isModalOpen) {
      setInitialValue(value);
    }
  }, [Boolean(value), isModalOpen]);
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
              .tox .tox-notification--warn, .tox .tox-notification--warning{
                display: none;
              }
              `,
        }}
      ></style>
      <Button
        className="w-100"
        variant="contained"
        onClick={() => setModalOpen(true)}
        color="primary"
      >
        {edit_button_text || "Edit"}
      </Button>
      <Modal
        onClose={() => setModalOpen(false)}
        isOpen={isModalOpen}
        noExtraUI
        isBig
        body={
          <Editor
            tinymceScriptSrc={`/tinymce/tinymce.min.js`}
            initialValue={initialValue}
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={(e, editor) => _setValue(editor.getContent())}
            init={{
              selector: "textarea#full-featured-non-premium",
              plugins:
                "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
              imagetools_cors_hosts: ["picsum.photos"],
              menubar: "file edit view insert format tools table help",
              toolbar:
                "undo redo | bold italic underline strikethrough | fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
              toolbar_sticky: true,
              autosave_ask_before_unload: true,
              autosave_interval: "30s",
              autosave_prefix: "{path}{query}-{id}-",
              autosave_restore_when_empty: false,
              autosave_retention: "2m",
              image_advtab: true,
              link_list: [],
              image_list: [],
              image_class_list: [],
              importcss_append: true,
              file_picker_callback: async function (callback, value, meta) {
                /* Provide file and text for the link dialog */
                if (meta.filetype === "file") {
                  callback("https://www.google.com/logos/google.jpg", {
                    text: "My text",
                  });
                }

                /* Provide image and alt text for the image dialog */
                if (meta.filetype === "image") {
                  const url = await imageHandler(_uploadFile);
                  callback(url, {
                    alt: label,
                  });
                }

                /* Provide alternative source and posted for the media dialog */
                if (meta.filetype === "media") {
                  const url = await mediaHandler(_uploadFile);
                  callback(url);
                }
              },
              templates: [
                {
                  title: "New Table",
                  description: "creates a new table",
                  content:
                    '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
                },
                {
                  title: "Starting my story",
                  description: "A cure for writers block",
                  content: "Once upon a time...",
                },
                {
                  title: "New list with dates",
                  description: "New List with dates",
                  content:
                    '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
                },
              ],
              template_cdate_format:
                "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
              template_mdate_format:
                "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
              height: "100%",
              image_caption: true,
              quickbars_selection_toolbar:
                "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
              noneditable_noneditable_class: "mceNonEditable",
              toolbar_mode: "sliding",
              contextmenu: "link image imagetools table",
              skin: "oxide",
              content_css: "default",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        }
      />
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    _uploadFile: (files, folderName, callback) =>
      dispatch(uploadFile({ files, folderName }, callback)),
    _removeFile: (index) => dispatch(removeFile(index)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(FieldRichText);
