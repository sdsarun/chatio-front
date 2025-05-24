import { NextResponse } from "next/server";

export const revalidate = 1;

export async function GET() {
  const users = [
    "aoffis", "shirokitsune", "nora", "kaito", "luna", "zen", "emilia", "noah", "akira", "sora",
    "yuki", "hikari", "leo", "mia", "ryuu", "suzu", "yuna", "kota", "mei", "ren",
    "hinata", "takumi", "ayaka", "haru", "ichika", "tetsu", "aya", "riku", "sena", "touma"
  ];

  const statuses = ["success", "warning", "muted", "destructive"] as const;

  const lastMessages = [
    "I'll be back soon.",
    "Hey, what's up?",
    "See you tomorrow.",
    "Can't talk right now.",
    "Meeting at 3PM confirmed!",
    "Grabbing coffee ☕",
    "Sending files tonight.",
    "AFK for a bit.",
    "Emergency, call later!",
    "Done with the project 🚀",
    "Heading out now.",
    "Lunch break!",
    "Good night 🌙",
    "Working on it!",
    "Catch up later?",
    "Awesome!",
    "No problem 👍",
    "Let's do it!",
    "Okay cool.",
    "Talk soon.",
  ];

  const responsePayload = users.map((username, index) => ({
    id: String(index + 1),
    username,
    aka: username,
    avatarUrl: `https://ui-avatars.com/api/?name=${username}&background=random`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lastMessage: lastMessages[Math.floor(Math.random() * lastMessages.length)],
  }));

  return NextResponse.json(responsePayload);
}