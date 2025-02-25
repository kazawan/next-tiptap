'use client';
import Editor from "@/components/Editor";
import { useState } from "react";


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

  function handleOnchange(e) {
    setContent(e);
  }

  return (
    <>
      <div className="flex justify-center align-middle ">
        <div>
          
        </div>
        <Editor content={content} onChange={handleOnchange} />
        <div>
          
        </div>
      </div>
      <div>
      </div>


    </>
  );
}

export default Home;
