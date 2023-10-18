import React from "react";
import "./App.css";
import useRecorder from "./hooks/useRecorder";
import { useForm } from "./hooks/useForm";
import { validations } from "./utils/validations";

const App = () => {
  const [
    audioURL,
    audioData,
    isRecording,
    startRecording,
    stopRecording,
  ] = useRecorder();

  const {
    handleBlur,
    handleChange,
    inputValues,
    errors,
    audioStatus,
    handleSubmit,
  } = useForm({
    validations,
  });

  return (
    <div className="microphone__wrapper">
      <audio src={audioURL} controls onChange={handleChange("audio")} />
      {/* Call to action */}
      {audioStatus && <p className="">{audioStatus}</p>}
      <div className="">
        <div style={{ margin: "0px", width: "100%" }}>
          <form onSubmit={(e) => handleSubmit(e)(audioData)}>
            <label
              data-testid="input_label"
              htmlFor="email"
              className={"microphone__label"}
            >
              Email
            </label>
            <input
              autoFocus
              name="email"
              data-testid="input"
              type="email"
              placeholder="Enter Email"
              className="microphone__input"
              onBlur={(e) => handleBlur(e)()}
              onChange={handleChange()}
              value={inputValues.email || ""}
            />
            {/* Helper text */}
            {errors.email && <p className="error">{errors.email}</p>}
            <div className="">
              <button
                data-testid="start_recording"
                className={`btn ${isRecording ? "btn__stop" : "btn__start"}`}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? "Stop Recording" : "Start Recording"}
              </button>

              <button
                data-testid="btn"
                className={`btn btn__submit`}
                onClick={(e) => handleSubmit(e, audioData)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default App;
