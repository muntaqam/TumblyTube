export const avatarFromInitials = (user, size) => {
  if (user == null) return;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = canvas.height = size;

  const initial = user.username[0].toUpperCase();
  const color = user.color;

  // draw background
  context.fillStyle = color;
  context.fillRect(0, 0, size, size);

  // draw text
  context.font = `${size / 2}px Roboto`;
  context.fillStyle = "#ffffff";
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.fillText(initial, size / 2, size / 1.8);

  return canvas.toDataURL("image/png");
};

export const generateRandomColor = () => {
  // padStart fix for hex code length problem
  // https://stackoverflow.com/a/25821830

  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};
