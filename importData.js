const fs = require('fs').promises;
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function importData() {
  try {
    const csvData = await fs.readFile('./data.csv', 'utf-8');
    const records = csvData.split('\n').slice(1); // Remove header row

    // Insert data into the database
    for (const record of records) {
      const [name, email] = record.split(',');

      await prisma.user.create({
        data: {
          name: name.trim(),
          email: email.trim(),
        },
      });
    }

    console.log('Data import successful!');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importData();
