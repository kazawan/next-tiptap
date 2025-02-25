'use client';
import Editor from "@/components/Editor";
import { useEffect, useState } from "react";


const markdown = `
# Hello World
This is a simple markdown editor built with React, Tiptap, and Vite.
## title2
### title3

- list1
- list2
- list3
* list4

[google](https://www.google.com)
![image](https://placehold.co/800x400)
\`code\`\

\`\`\`js
console.log("Hello World");
\`\`\`

Text



`;

function Home() {
  const [content, setContent] = useState(markdown);
  const [title, setTitle] = useState([]);

  function handleOnchange(e) {
    setContent(e);

  }

  function handleSave() {
    console.log(content);
  }

  function handleGetTitle() {
    // 获取 # ## ### 的字符串 作为标题 导入到title中
    // 通过正则匹配
    const titleReg = /#+\s+(.*)/g;
    const titleArr = content.match(titleReg);
    setTitle(titleArr);
  }

  function scorlltotitle(e) {
    const title = e.target.innerText;
    // Find the element containing this title text
    const elements = document.getElementsByClassName('ProseMirror')[0].querySelectorAll('h1, h2, h3');
    for (let element of elements) {
      if (element.innerText === title.replace(/^#+\s+/, '')) {
        element.scrollIntoView({ behavior: 'smooth' });
        break;
      }
    }
  }
  useEffect(() => {
    handleGetTitle();
  }, [content]);

  return (
    <>
      <div className="flex justify-center align-middle ">
        <div>

        </div>
        <Editor content={content} onChange={handleOnchange} />
        <div className="flex flex-col">
          <div className="flex justify-center w-full">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
          <div >  
            标题
          {title.map((item, index) => (
            <div key={index} onClick={scorlltotitle}
            className=" w-fit cursor-pointer hover:text-blue bg-gray-200 mb-2 px-2 rounded-lg "
            >{item}</div>
          ))}
        </div>

        </div>
       
      </div>
      <div>
      </div>


    </>
  );
}

export default Home;
