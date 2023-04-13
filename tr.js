import fs from "fs";
import path from "path";
import translate from "translate-google";

const persianRegexp = /[\u0600-\u06FF]/;

const translateToEn = async (content) => translate(content, { to: "en" });

const generateChunk = (data = [], chunkSize = 2) => {
  let res = [];
  for (let i = 0; i < Math.ceil(data.length / chunkSize); i++) {
    res.push(new Array(chunkSize));
  }


  for (let i = 0; i < data.length; i++) {
    const x = i % chunkSize;
    const y = Math.floor(i / chunkSize);
    res[y][x] = data[i];
  }
  return res;
};

const generateTranslation = async (content, contentMap) => {
  const persianParts = contentMap.map((range) => {
    return content.slice(range.from, range.to);
  });

  const dataChunks = generateChunk(persianParts)
  let translationResult = []

  for (let i = 0; i < dataChunks.length; i++) {
    const res = await Promise.all(dataChunks[i].map((i) => translateToEn(i)));

    console.log("translated", dataChunks[i], res);

    translationResult.push(res);
  }

  translationResult = translationResult.flat()

  // const translationResult = await Promise.all(persianParts.map((i) => translateToEn(i)));

  return contentMap.map((pr, index) => {
    return {
      ...pr,
      persian: persianParts[index],
      english: translationResult[index],
    };
  });
};

function replaceRange(string, start, end, word) {
  // split the string into two parts at the index range
  let partOne = string.substring(0, start);
  let partTwo = string.substring(end);

  // concatenate the modified string
  let modifiedString = partOne + word + partTwo;

  // return the modified string
  return modifiedString;
}

const finalReplacement = (content, contentMap = []) => {
  const rs = contentMap.reduceRight((acc, cur) => {
    const { from, to, english } = cur;
    return (acc = replaceRange(acc, from, to, english));
  }, content);

  return rs;
};

const getPersianMapFromCode = (code = "") => {
  let charMap = [];
  let isRangeOpen = false;
  // loop in the code char by char
  for (let i = 0; i < code.length; i++) {
    // ignore spaces
    if (code.charCodeAt(i) === 32 || code.charCodeAt(i).toString(16) === "200c") continue;

    if (isRangeOpen) {
      if (!persianRegexp.test(code.charAt(i))) {
        isRangeOpen = false;
        charMap[charMap.length - 1].to = i;
      }
    } else {
      if (persianRegexp.test(code.charAt(i))) {
        isRangeOpen = true;
        charMap.push({ from: i });
      }
    }
  }
  return charMap;
};

const replaceWordsWithPattern = async (file) => {
  try {
    // Read the contents of the file
    const contents = await fs.promises.readFile(file, "utf-8");

    const persianCharMap = getPersianMapFromCode(contents);
    const result = await generateTranslation(contents, persianCharMap);

    const res = finalReplacement(contents, result);

    await fs.promises.writeFile(file, res, "utf-8"); 
    console.log("\x1b[32m", `Successfully replaced words with pattern in ${file}`);
  } catch (error) {
    console.error("\x1b[31m" ,`Error replacing words with pattern in ${file}: ${error.message}`);
  }
};

function listJSFilesInCurrentFolder(filePath) {
  fs.readdir(filePath, (err, files) => {
    if (err) throw err;

    files.forEach((file)=>{
      const isFolder = fs.lstatSync(`${filePath}/${file}`).isDirectory()
      const fileExtname = path.extname(file).toLowerCase()
      if(isFolder) return listJSFilesInCurrentFolder(`${filePath}/${file}`)
      if (fileExtname === ".js") {
        if (fileExtname === "tr.js") return;
        // console.log("\x1b[32m" ,`running for ${filePath}/${file}`)
        replaceWordsWithPattern(`${filePath}/${file}`);
      } else console.log("\x1b[31m" , `unknown file ${filePath}/${file}` );
    })

    // files
    //   .filter((file) => {
    //     console.log(file)
    //     return path.extname(file).toLowerCase() === ".js" && file !== "tr.js" && file !== "translator.js";
    //   })
    //   .forEach((file) => {
    //     console.log('\x1b[36m%s\x1b[0m', `Found ${filePath}/${file}`);
    //   });
  });
}


listJSFilesInCurrentFolder(process.argv[2]);
