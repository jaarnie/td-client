import React, { useContext } from "react"
import { Editor, EditorState, convertFromRaw } from "draft-js"

import { Store } from '../../Store'

export default function Therapist() {
const { state } = useContext(Store)

const contentState = convertFromRaw(JSON.parse(state.therapist.dailies[3].entry))
const editorState = EditorState.createWithContent(contentState)

  return (
    <div>
      <Editor
        editorState={editorState}
        readOnly={true}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
      />
    </div>
  )
}
