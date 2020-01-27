import React, { useState } from "react"
import { Editor } from "react-draft-wysiwyg"
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { Button } from "@material-ui/core"
import Axios from "axios"
import { useSnackbar } from "notistack"


import { serverHeaders, serverRoot } from '../../config/index'

export default function DailyEditor() {
  const { enqueueSnackbar } = useSnackbar()
  const [state, setState] = useState({
    editorState: EditorState.createEmpty()
  })

  const axiosServer = Axios.create({
    baseURL: serverRoot,
    headers: serverHeaders
  })

  const handleChange = editorState => {
    // const contentState = editorState.getCurrentContent()
    // console.log("content state", convertToRaw(contentState))
    setState({
      editorState
    })
    // debugger
  }

  const handleClick = async event => {
    event.preventDefault()
    const contentRaw = convertToRaw(state.editorState.getCurrentContent())
    try {
      const response = await axiosServer.post("/dailies", {
        entry: JSON.stringify(contentRaw),
        happy_score: 10, //admin
        sad_score: 0, // admin
        therapist_id: 1, // pass down from admin
        user_id: 1
      })
      if (response === 200) {
        enqueueSnackbar('Entry saved', {
          variant: "success"
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <Editor
        editorState={state.editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={handleChange}
      />
      <Button variant="contained" color="primary" onClick={handleClick}>
        Save
      </Button>
    </div>
  )
}
