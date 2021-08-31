import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const RangeInput = ({
  isMounted,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 0,
  onChange = () => {},
}) => {
  const inputRef = useRef();
  const [isChanging, setIsChanging] = useState(false);

  const getPercent = useMemo(
    () => (value) => ((value - min) / (max - min)) * 100,
    [max, min, defaultValue]
  );

  const changeInputProgressPercentStyle = useCallback(() => {
    inputRef.current.style.setProperty(
      "--webkitProgressPercent",
      `${getPercent(inputRef.current.value)}%`
    );
  }, [getPercent]);

  useEffect(() => {
    changeInputProgressPercentStyle();
    const inputElement = inputRef.current;

    const handleUpAndLeave = () => setIsChanging(false);
    const handleDown = () => setIsChanging(true);

    inputElement.addEventListener("mousemove", changeInputProgressPercentStyle);
    inputElement.addEventListener("mousedown", handleDown);
    inputElement.addEventListener("mouseup", handleUpAndLeave);
    inputElement.addEventListener("mouseleave", handleUpAndLeave);
    return () => {
      inputElement.removeEventListener(
        "mousemove",
        changeInputProgressPercentStyle
      );
      inputElement.removeEventListener("mousedown", handleDown);
      inputElement.removeEventListener("mouseup", handleUpAndLeave);
      inputElement.removeEventListener("mouseleave", handleUpAndLeave);
    };
  }, [isChanging, changeInputProgressPercentStyle]);

  useEffect(() => {
    if (!inputRef?.current) return;
    changeInputProgressPercentStyle();
  }, [inputRef, changeInputProgressPercentStyle]);

  // animation on mounted and unmounted
  const mountedRangeStyle = {
    animation: "inAnimation 250ms ease-in",
    animationFillMode: "forwards",
  };
  const unmountedRangeStyle = {
    animation: "outAnimation 0.5s ease-out",
  };

  return (
    <>
      <input
        className='player__range'
        type='range'
        ref={inputRef}
        min={min}
        max={max}
        step={step}
        value={defaultValue}
        onChange={(e) => onChange(e.currentTarget.value)}
        style={isMounted ? mountedRangeStyle : unmountedRangeStyle}
      />
    </>
  );
};

export default RangeInput;
