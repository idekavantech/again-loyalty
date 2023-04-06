export const generateCSVFile = (headCells, rows, summary, fileName) => {
  let csvContent = "data:text/csv;charset=utf-8,%EF%BB%BF";
  const content = [headCells, ...rows, summary].join("\n");
  let encodedUri = csvContent + encodeURIComponent(content);
  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName ? `${fileName}.csv` : "report.csv");
  document.body.appendChild(link); // Required for FF
  link.click();
};
