

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {

  const woodenCategory = await prisma.category.findUnique({
    where: {
      id: 1,
    },
  });
  if (!woodenCategory) {
    console.error('Category "wooden toys" not found');
    return;
  }

  const dollsCategory = await prisma.category.findUnique({
    where: {
      id: 2,
    },
  });

  if (!dollsCategory) {
    console.error('Category not found');
    return;
  }





  // Dodaj użytkowników
  const user1 = await prisma.user.create({
    data: {
        first_name: 'Marlena',
        last_name: 'Kowalska',
        email: 'marlena@user.com',
        password: 'qazwsx',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      first_name: 'Karmazyn',
      last_name: 'Nowak',
      email: 'karmazyn@example.com',
      password: 'qazwsx',
    },
  });

  // Dodaj kategorie
  const category1 = await prisma.category.create({
    data: {
      name: 'Games and Puzzles',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Construction toys',
    },
  });
  const category3 = await prisma.category.create({
    data: {
      name: 'Books',
    },
  });

  // Dodaj produkty
  const product1 = await prisma.product.create({
    data: {
      name: 'Lego Friends',
      producer: 'Lego',
      description: 'The best blocks for people',
      active: true,
      photo: 'LEGOFriends.jpg',
      ownerId: user1.id,
      categoryId: category2.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Pikachu Block',
      producer: 'Mega',
      description: 'Premium construction set with 1,092 pieces and movable parts for various poses',
      active: true,
      photo: 'pikachu.png',
      ownerId: user2.id,
      categoryId: category2.id,
    },
  });
  const product3 = await prisma.product.create({
    data: {
      name: 'Basia Puzzle',
      producer: 'Trefl',
      description: 'The best puzzle for everyone',
      active: true,
      photo: 'puzzle_1.png',
      ownerId: user2.id,
      categoryId: category1.id,
    },
  });
  const product4 = await prisma.product.create({
    data: {
      name: 'Speed Car',
      producer: 'Ence Pence',
      description: 'A toy that develops imagination, not only for boys',
      active: true,
      photo: 'auto_1.png',
      ownerId: user2.id,
      categoryId: woodenCategory.id,
    },
  });
  const product5 = await prisma.product.create({
    data: {
      name: 'Construction Car',
      producer: 'Beskidy Mountains',
      description: 'This interesting sensory sorter is a tool supporting the development of a childs senses',
      active: true,
      photo: 'auto_2.png',
      ownerId: user2.id,
      categoryId: woodenCategory.id,
    },
  });
  const product6 = await prisma.product.create({
    data: {
      name: 'Wooden puzzle',
      producer: 'Beskidy Mountains',
      description: 'Durable and safe puzzle',
      active: true,
      photo: 'wooden_1.png',
      ownerId: user2.id,
      categoryId: woodenCategory.id,
    },
  });
  const product7 = await prisma.product.create({
    data: {
      name: 'Sensory ball',
      producer: 'Grimms',
      description: 'The best ball for your little baby',
      active: true,
      photo: 'sensory_ball.png',
      ownerId: user2.id,
      categoryId: category2.id,
    },
  });
  const product8 = await prisma.product.create({
    data: {
      name: 'Spiderman Cuddly Toy',
      producer: 'Beko',
      description: 'Hug your superhero',
      active: true,
      photo: 'spiderman.png',
      ownerId: user2.id,
      categoryId: dollsCategory.id,
    },
  });
  const product9 = await prisma.product.create({
    data: {
      name: 'Minnie Cuddly Toy',
      producer: 'Beko',
      description: 'Hug your superhero',
      active: true,
      photo: 'minnie_maskot.png',
      ownerId: user2.id,
      categoryId: dollsCategory.id,
    },
  });
  const product10 = await prisma.product.create({
    data: {
      name: 'Bulbasaur Block',
      producer: 'Beko',
      description: 'Play your superheroo',
      active: true,
      photo: 'bulbasaur.png',
      ownerId: user2.id,
      categoryId: category2.id,
    },
  });
  const product11 = await prisma.product.create({
    data: {
      name: 'Constructor puzzle',
      producer: 'Beko',
      description: 'Grimms wooden puzzle is the most famous series of products from this manufacturer',
      active: true,
      photo: 'construction_puzzle.png	',
      ownerId: user2.id,
      categoryId: category1.id,
    },
  });
  const product12 = await prisma.product.create({
    data: {
      name: 'Puzzle Paris',
      producer: 'Trefl',
      description: 'The best puzzle for everyone',
      active: true,
      photo: 'puzzle_Paris.png',
      ownerId: user2.id,
      categoryId: category1.id,
    },
  });
  const product13 = await prisma.product.create({
    data: {
      name: 'Puller Lion',
      producer: 'Grimms',
      description: 'The best for your little baby',
      active: true,
      photo: 'sensory_toys_2.png	',
      ownerId: user2.id,
      categoryId: category2.id,
    },
  });
  const product14 = await prisma.product.create({
    data: {
      name: 'Bingo Puzzle',
      producer: 'Nasza Księgarnia',
      description: 'The second part of Pucios adventures focuses on the first words typical of a childs speech development',
      active: true,
      photo: 'bingo_puzzle.png',
      ownerId: user2.id,
      categoryId: category1.id,
    },
  });



}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
