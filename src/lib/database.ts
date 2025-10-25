import { MongoClient, OptionalId } from "mongodb";

async function connect(){
    const uri = process.env.MONGO_CONN;

    // The MongoClient is the object that references the connection to our
    // datastore (Atlas, for example)
    const client = new MongoClient(uri);

    // The connect() method does not attempt a connection; instead it instructs
    // the driver to connect using the settings provided when a connection
    // is required.
    await client.connect();

    // Provide the name of the database and collection you want to use.
    // If the database and/or collection do not exist, the driver and Atlas
    // will create them automatically when you first write data.
    const dbName = "farmba";

    // Create references to the database and collection in order to run
    // operations on them.
    const database = client.db(dbName);

    return database;
}

export async function insert<TSchema, T extends OptionalId<TSchema>>(collectionName: string, data: T){
    const db = await connect();
    const collection = db.collection(collectionName);
    if(!collection){
        return false;
    }
    try {
        //const insertManyResult = await collection.insertMany(data);
        const insertOneResult = await collection.insertOne(data);

        console.log(`Documents successfully inserted: ${insertOneResult.acknowledged}\n`);
        return insertOneResult.acknowledged;
    } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
        return false;
    }
}