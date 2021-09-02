export const viewsFormatted = (numViews) => {
  const views = numViews;

  if (views < 999) return views;

  if (views >= 1000) {
    let dividedT = views / 1000;
    if (dividedT > Math.floor(dividedT)) {
      return `${dividedT.toFixed(1)}K`;
    } else {
      // no decimals if dividedThousands is a whole num
      return `${dividedT}K`;
    }
  }

  if (views >= 1000000) {
    let dividedM = views / 1000000;
    if (dividedM > Math.floor(dividedM)) {
      return `${dividedM.toFixed(1)}M`;
    } else {
      // no decimals if dividedMillions is a whole num
      return `${dividedM}M`;
    }
  }
};

export const handleAutoPlayIn = (e) => {
  e.target.play();
};

export const handleAutoPlayOut = (e) => {
  e.target.currentTime = 0;
  e.target.pause();
};
