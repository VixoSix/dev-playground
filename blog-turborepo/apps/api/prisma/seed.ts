import "dotenv/config";
import { faker } from "@faker-js/faker";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "",
});

const prisma = new PrismaClient({ adapter });

function generateSlug(title: string): string {
    return title.toLowerCase().trim().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

async function main() {
    const users = Array.from({ length: 10 }).map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        bio: faker.lorem.sentence(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
    }));

    await prisma.user.createMany({
        data: users,
    });

    const posts = Array.from({ length: 20 }).map(() => {
        const title = faker.lorem.sentence();

        return {
            title,
            slug: generateSlug(title),
            content: faker.lorem.paragraphs(3),
            thumbnail: faker.image.urlLoremFlickr(),
            authorId: faker.number.int({ min: 1, max: 10 }),
            published: true,
        };
    });

    await Promise.all(
        posts.map((post) =>
            prisma.post.create({
                data: {
                ...post,
                comments: {
                    createMany: {
                    data: Array.from({ length: 20 }).map(() => ({
                        content: faker.lorem.sentence(),
                        authorId: faker.number.int({ min: 1, max: 10 }),
                    })),
                    },
                },
                },
            }),
        ),
    );

    console.log("Seeding Completed!");
}

main().then(async () => {
    await prisma.$disconnect();
    process.exit(0);
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});