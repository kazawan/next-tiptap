'use client';
import Editor from "@/components/Editor";
import { useState } from "react";

function Home() {
  const [content,setContent] = useState("<p>Hello World! 🌎️</p>");
 
  function handleOnchange(e){
    setContent(e);
  }

  function handleLog(){
    console.log(content);
  }
  return (
    <>
    <div>
      <h1>Home</h1>
    </div>
    <div>
      <Editor content={content} onChange={handleOnchange} />
    </div>
    <div>
      <button onClick={handleLog} >log</button>
    </div>
    
    </>
  );
}

export default Home;
