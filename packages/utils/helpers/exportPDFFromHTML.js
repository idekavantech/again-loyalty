import Axios from "axios";

export const exportPDFFromHTML = async ({ html, css, configs }, filename) => {
  const { data: pdf } = await Axios.post("/api/pdf", {
    css,
    html,
    configs,
  });
  const buffer = Buffer.from(pdf.data);
  const blob = new Blob([buffer]);
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};
