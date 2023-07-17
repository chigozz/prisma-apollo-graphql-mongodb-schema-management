// resolvers.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await prisma.user.findMany();
        if (users.length > 0) {
          // Data exists in the database
          return users;
        } else {
          // Data is empty in the database
          console.log("No data found in the database.");
          return [];
        }
      } catch (error) {
        console.error("Error fetching users from the database:", error);
        throw new Error("Failed to fetch users from the database.");
      }
    },
  },
};
