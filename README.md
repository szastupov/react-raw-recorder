# React Raw Recorder

React wrapper for [Raw Media Recorder](https://github.com/szastupov/raw-media-recorder)

## Install
``` yarn add raw-media-recorder ```

or

``` npm install raw-media-recorder ```

## Usage

```javascript
import Recorder from "react-raw-recorder"

// ...

<Recorder
  audioContext={this.audioCtx}
  onRecording={() => console.log("recording in progress")}
  onRecorded={audio => console.log("recorded AudioBuffer", audio)}
>
  {recorder => (
    <button
      className={classNames("recorder-button", {
        recording: recorder.recording
      })}
      onClick={recorder.toggle}
    >
      <i className="fa fa-4x fa-microphone" />
    </button>
  )}
</Recorder>
```
