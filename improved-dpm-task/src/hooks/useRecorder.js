import { useEffect, useState } from "react";
// https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API
// https://javascript.info/blob
// https://stackoverflow.com/questions/27159179/how-to-convert-blob-to-file-in-javascript/53205768#53205768

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [audioData, setAudioData] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    // If user has not recorded then record.
    if (recorder === null) {
      if (isRecording) requestRecorder().then(setRecorder, console.error);
      return;
    }

    // handle recorder state.
    isRecording ? recorder.start() : recorder.stop();

    // Obtain the audio when ready. and make it into blob to send to database
    const handleData = ({ data }) => {
      setAudioURL(URL.createObjectURL(data));
      const file = new File([data], "new_audio", {
        type: data.type,
      });
      setAudioData(file);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => setIsRecording(true);

  const stopRecording = () => setIsRecording(false);

  return [audioURL, audioData, isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}
export default useRecorder;
