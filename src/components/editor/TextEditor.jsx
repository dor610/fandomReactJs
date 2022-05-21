
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import toolBarOption from "./editorConfig";
import { convertToRaw } from "draft-js";
import draftjsToHtml from "draftjs-to-html";
import "./editor.css";
import { useEffect, useRef, useState } from "react";
import { convertFromRaw } from "draft-js";

const TextEditor = ({type, func, data, size = "medium", isClear = false, setIsClear}) =>{
    const [content, setContent] = useState(() => EditorState.createEmpty());
    const [initData, setInitData] = useState(data);
    const [hasContent, setHasContent] = useState(true);
    const editorRef = useRef();

    const onContentChange = (contentState) =>{
        setContent(contentState);
        func(JSON.stringify(convertToRaw(contentState.getCurrentContent())))
    }

    useEffect(() =>{
        if(isClear){
            setContent(EditorState.createEmpty());
            setIsClear(false);
        }
    })


    useEffect(() =>{
        if(type === "display" || type === "edit"){
            if(initData){
                let textObject = JSON.parse(initData);
                setContent(EditorState.createWithContent(convertFromRaw(textObject)));
                if( type === "display" && textObject.blocks[0].text === "") setHasContent(false);
            }
        }
    }, [initData, type])

    const setWrapperClassName = () =>{
        switch(size){
            case "large": return "largeContainer";
            case "small" : return "smallContainer";
            default: return "container";
        }
    }

    if(type === "create" || type === "edit"){
       if(hasContent){
        return (
                <Editor
                            ref={editorRef}
                            editorState={content}
                            toolbarClassName={"toolBar"}
                            wrapperClassName={setWrapperClassName()}
                            editorClassName={"editor"}
                            onEditorStateChange={onContentChange}
                            toolbar={toolBarOption}
                            />
        )
       }
    }

    if(type === "display"){
        if(hasContent){
            return <Editor
                readOnly={true}
                editorState={content}
                toolbarHidden
                wrapperClassName={"displayContainer"}
                editorClassName={"displayEditor"}
                onEditorStateChange={setContent}/>
        }
    }

    return (<></>)
}

export default TextEditor;