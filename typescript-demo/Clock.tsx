import React, { useState } from "react";

function Clock() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return <div>현재 시간: {currentTime.toLocaleTimeString()}</div>;
}

export default Clock;
