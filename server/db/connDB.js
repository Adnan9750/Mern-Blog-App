import mongoose from 'mongoose';

export const connDB = async () =>{
    try {
        await mongoose.connect('mongodb://adnansarfaraz:Adnan975@ac-1tpvn8w-shard-00-00.xbhdblq.mongodb.net:27017,ac-1tpvn8w-shard-00-01.xbhdblq.mongodb.net:27017,ac-1tpvn8w-shard-00-02.xbhdblq.mongodb.net:27017/Blog-App?ssl=true&replicaSet=atlas-2q3f10-shard-0&authSource=admin&retryWrites=true&w=majority')
        console.log("Successfully connected");
    } catch (error) {
        console.log(error);
    }
}