import { useState, useRef, useEffect } from "react";

function MicWebSocket() {
  const [recording, setRecording] = useState(false);
  const ws = useRef(null);
  const mediaRecorder = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8765"); // Pythonサーバー
    ws.current.onopen = () => console.log("WebSocket connected");
    ws.current.onclose = () => console.log("WebSocket closed");
  }, []);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = e => {
      if (ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(e.data); // 音声データを送信
      }
    };

    mediaRecorder.current.start(200); // 200msごとにデータ取得
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>Start</button>
      <button onClick={stopRecording} disabled={!recording}>Stop</button>
    </div>
  );
}

export default MicWebSocket;
