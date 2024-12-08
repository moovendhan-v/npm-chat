import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Generate dummy User data
const generateUser = () => ({
  id: faker.database.mongodbObjectId(),
  username: faker.internet.username(),
  email: faker.internet.email(),
  createdAt: faker.date.past(),
});

// Generate dummy OneOnOneChat data
const generateOneOnOneChat = (senderId, receiverId) => ({
  id: faker.database.mongodbObjectId(),
  senderId,
  receiverId,
  createdAt: faker.date.recent(),
});

// Function to insert dummy data into the database
const seedDatabase = async () => {
  try {
    // Create dummy users
    const user1 = generateUser();
    const user2 = generateUser();

    await prisma.user.createMany({
      data: [user1, user2],
    });

    console.log('Users inserted successfully.');

    // Create a one-on-one chat
    const oneOnOneChat = generateOneOnOneChat(user1.id, user2.id);

    await prisma.oneOnOneChat.create({
      data: oneOnOneChat,
    });

    console.log('One-on-One Chat inserted successfully.');

    // Create a group
    const group = {
      id: faker.database.mongodbObjectId(),
      name: faker.company.name(),
    };

    await prisma.group.create({
      data: group,
    });

    console.log('Group inserted successfully.');

    // Add users as group admin and group member
    await prisma.groupAdmin.create({
      data: {
        id: faker.database.mongodbObjectId(),
        userId: user1.id,
        groupId: group.id,
      },
    });

    await prisma.groupMember.create({
      data: {
        id: faker.database.mongodbObjectId(),
        userId: user2.id,
        groupId: group.id,
      },
    });

    console.log('Group Admin and Member inserted successfully.');

    // Create a message
    const message = {
      id: faker.database.mongodbObjectId(),
      content: faker.lorem.sentence(),
      senderId: user1.id,
      chatId: oneOnOneChat.id,
      createdAt: faker.date.recent(),
    };

    await prisma.message.create({
      data: message,
    });

    console.log('Message inserted successfully.');

    // Create a reaction for the message
    const reaction = {
      id: faker.database.mongodbObjectId(),
      type: faker.helpers.arrayElement(['like', 'love', 'laugh']),
      messageId: message.id,
      userId: user2.id,
      createdAt: faker.date.recent(),
    };

    await prisma.reaction.create({
      data: reaction,
    });

    console.log('Reaction inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

// Run the seeding function
seedDatabase();
