//Get Current time  h/m/s
export const getCurrentTimeInString = (): string => {
  const today = new Date();

  const h = String(today.getHours()).padStart(2, "0");
  const m = String(today.getMinutes()).padStart(2, "0");
  const s = String(today.getSeconds()).padStart(2, "0");

  return `${h}:${m}:${s}`;
};

//Get Current dd/mm/yyyy
export const getCurrentDateInString = (): string => {
  const today = new Date();

  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};

// Greeting
enum Greeting {
  GOOD_MORNING = "Good morning",
  LUNCH_TIME = "Let's have a lunch time",
  GOOD_AFTERNOON = "Good afternoon",
  GOOD_EVENING = "Good evening",
  GOOD_NIGHT = "Good night, time to sleep",
}

export const getGreetingSentence = (name: string): string => {
  const hr = new Date().getHours();
  let greeting = "";

  switch (true) {
    case hr <= 10:
      greeting = Greeting.GOOD_MORNING;
      break;
    case hr === 12:
      greeting = Greeting.LUNCH_TIME;
      break;
    case hr <= 14:
      greeting = Greeting.GOOD_AFTERNOON;
      break;
    case hr <= 20:
      greeting = Greeting.GOOD_EVENING;
      break;
    default:
      greeting = Greeting.GOOD_NIGHT;
      break;
  }
  return `${greeting} ${name}!`;
};
