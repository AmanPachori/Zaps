import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

async function main() {
  await prismaClient.availableTrigger.create({
    data: {
      id: "webhook",
      name: "Webhook",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",
    },
  });

  await prismaClient.availableAction.create({
    data: {
      id: "action",
      name: "Action",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2PcYfVcawdgFBbYuz-jvF8R7sYYhskIyQr7SLYGvrytHiRPJHGw5dZ1YhwKmOU0Gsodk",
    },
  });

  await prismaClient.availableAction.create({
    data: {
      id: "email",
      name: "Send Email",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nd82eFk5SaBPRIeCpmwL7A4YSokA-kXSmw&s",
    },
  });
}

main();
