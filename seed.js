

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Dodaj użytkowników
  const user1 = await prisma.user.create({
    data: {
        first_name: 'Janusz',
        last_name: 'Kowalski',
        email: 'janusz@example.com',
        password: 'qazwsx',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      first_name: 'Anna',
      last_name: 'Nowak',
      email: 'anna@example.com',
      password: 'qazwsx',
    },
  });

  // Dodaj kategorie
  const category1 = await prisma.category.create({
    data: {
      name: 'Wooden toys',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Dolls',
    },
  });

  // Dodaj produkty
  const product1 = await prisma.product.create({
    data: {
      name: 'Barbie',
      producer: 'Barbie',
      description: '	The best dolls',
      active: true,
      photo: '	barbie.png',
      ownerId: user1.id,
      categoryId: category2.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Tęcza 12-elementowa',
      producer: 'Grimms',
      description: 'Grimms wooden rainbow is the most famous series of products from this manufacturer',
      active: true,
      photo: 'rainbow.jpg',
      ownerId: user2.id,
      categoryId: category1.id,
    },
  });

  console.log({ user1, user2, category1, category2, product1, product2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
