import { NextResponse } from "next/server";

export const revalidate = 1;

export async function GET() {
  const sampleUsernames = [
    "aoffis", "shirokitsune", "nora", "kaito", "luna", "zen", "emilia", "noah", "akira", "sora",
    "yuki", "hikari", "leo", "mia", "ryuu", "suzu", "yuna", "kota", "mei", "ren",
    "hinata", "takumi", "ayaka", "haru", "ichika", "tetsu", "aya", "riku", "sena", "touma",
    "arisa", "keita", "souta", "nanami", "subaru", "masaki", "kana", "riko", "kanna", "shun",
    "itsuki", "madoka", "tsubasa", "kaho", "hiyori", "chika", "rei", "saki", "momoka", "yuto"
  ];

  const statuses = ["success", "warning", "muted", "destructive"] as const;

  const responsePayload = sampleUsernames.slice(10, 20).map((username, index) => ({
    id: String(index + 1),
    username,
    aka: username,
    avatarUrl: `https://ui-avatars.com/api/?name=${username}&background=random`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
  console.log("[LOG] - route.ts:23 - responsePayload - responsePayload:", responsePayload)

  return NextResponse.json(responsePayload);
}