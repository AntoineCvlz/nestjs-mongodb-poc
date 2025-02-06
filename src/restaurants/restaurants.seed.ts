import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb://admin:adminpassword@localhost:27017';
const DATABASE_NAME = 'nest-js-mongodb-poq';
const COLLECTION_NAME = 'restaurants';

const restaurants = [
  {
    name: 'Le Gourmet',
    location: {
      type: 'Point',
      coordinates: [48.8566, 2.3522],
    },
  },
  {
    name: 'Chez Mario',
    location: {
      type: 'Point',
      coordinates: [45.764, 4.8357],
    },
  },
  {
    name: 'Sushi Palace',
    location: {
      type: 'Point',
      coordinates: [48.8584, 2.2945],
    },
  },
  {
    name: 'Tacos Fiesta',
    location: {
      type: 'Point',
      coordinates: [43.2965, 5.3698],
    },
  },
  {
    name: 'Le Petit Bistro',
    location: {
      type: 'Point',
      coordinates: [50.8503, 4.3517],
    },
  },
];

async function seedDatabase() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log('✅ Connexion à MongoDB réussie.');

    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Insérer des restaurants
    const result = await collection.insertMany(restaurants);
    console.log(`✅ ${result.insertedCount} restaurants insérés avec succès.`);
  } catch (error) {
    console.error('❌ Erreur lors de l’insertion des données :', error);
  } finally {
    await client.close();
    console.log('🔌 Connexion MongoDB fermée.');
  }
}

seedDatabase();