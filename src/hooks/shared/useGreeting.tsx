export default function useGreeting() {
  let greeting = "Selamat ";
  const currentHour = new Date().getHours();

  if (currentHour >= 1 && currentHour < 11) {
    greeting += "Pagi";
  } else if (currentHour >= 11 && currentHour < 15) {
    greeting += "Siang";
  } else if (currentHour >= 15 && currentHour < 18) {
    greeting += "Sore";
  } else {
    greeting += "Malam";
  }

  return greeting;
}
