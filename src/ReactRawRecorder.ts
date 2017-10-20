import { Component } from "react"
import RawMediaRecorder from "raw-media-recorder"

export interface IReactRawRecorderProps {
  audioContext: AudioContext
  onRecording: (boolean) => void
  onRecorded: (AudioBuffer) => void
  children: (ReactRawRecorder) => any
}

export interface IReactRawRecorderState {
  recording: boolean
}

export class ReactRawRecorder extends Component<
  IReactRawRecorderProps,
  IReactRawRecorderState
> {
  recorder: RawMediaRecorder

  state = {
    recording: false
  }

  initStream = stream => {
    let recorder = (this.recorder = new RawMediaRecorder(
      this.props.audioContext,
      stream
    ))
    recorder.onstart = () => {
      this.props.onRecording(true)
      this.setState({ recording: true })
    }
    recorder.onstop = () => {
      this.props.onRecording(false)
      this.setState({ recording: false })
    }
    recorder.ondata = data => this.props.onRecorded(data)
  }

  requestMic() {
    return navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(this.initStream)
      .catch(err => console.error(err))
  }

  toggle = () => {
    if (this.state.recording) {
      this.recorder.stop()
    } else if (this.recorder) {
      this.recorder.start()
    } else {
      this.requestMic().then(() => this.recorder.start())
    }
  }

  get recording() {
    return this.state.recording
  }

  render() {
    return this.props.children(this)
  }
}

export default ReactRawRecorder
