import { PrismaClient, TranslationLanguage, ContactType } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const LANGS: TranslationLanguage[] = ['sr', 'en', 'ru']
const CONTACT_TYPES: ContactType[] = [
	'PHONE',
	'EMAIL',
	'TELEGRAM',
	'VIBER',
	'WHATSAPP',
]

function getRandomContacts() {
	const types = faker.helpers.arrayElements(
		CONTACT_TYPES,
		faker.number.int({ min: 1, max: 3 })
	)
	return types.map(type => ({
		type,
		value: type === 'EMAIL' ? faker.internet.email() : faker.phone.number(),
		description: faker.datatype.boolean() ? faker.lorem.sentence() : null,
	}))
}

function getSlugFromName(name: string) {
	return faker.helpers.slugify(name.toLowerCase()).replace(/[^a-z0-9\-]/g, '')
}

async function createSchools(count: number) {
	for (let i = 0; i < count; i++) {
		const translations = LANGS.map(lang => {
			const name = faker.company.name()
			return {
				lang,
				name,
				slug: getSlugFromName(name),
				address: faker.location.streetAddress(),
				description: faker.lorem.paragraph(),
			}
		})

		await prisma.school.create({
			data: {
				translations: { create: translations },
				contacts: { create: getRandomContacts() },
			},
		})
	}
}

async function createKindergartens(count: number) {
	for (let i = 0; i < count; i++) {
		const translations = LANGS.map(lang => {
			const name = `${faker.word.words({ count: 2 })} Kindergarten`
			return {
				lang,
				name,
				slug: getSlugFromName(name),
				address: faker.location.streetAddress(),
				description: faker.lorem.paragraph(),
			}
		})

		await prisma.kindergarten.create({
			data: {
				ageGroup: faker.helpers.arrayElement(['2-4', '3-6', '4-7']),
				translations: { create: translations },
				contacts: { create: getRandomContacts() },
			},
		})
	}
}

async function main() {
	await createSchools(10)
	await createKindergartens(5)
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
