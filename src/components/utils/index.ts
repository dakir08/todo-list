export const getCurrentTimeInString = (): string => {
  const today = new Date();

  const h = String(today.getHours()).padStart(2, "0");
  const m = String(today.getMinutes()).padStart(2, "0");
  const s = String(today.getSeconds()).padStart(2, "0");

  return `${h}:${m}:${s}`;
};

export const getCurrentDateInString = (): string => {
  const today = new Date();

  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};
