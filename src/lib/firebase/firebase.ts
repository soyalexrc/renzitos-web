import "server-only";
import {getFirestore} from "firebase-admin/firestore";
import {getDownloadURL, getStorage} from "firebase-admin/storage";


export const getProducts = async () => {
    const firestore = getFirestore();
    const products = await firestore.collection("products").get();
    return products.docs.map(doc => doc.data());
}

export const getFromBucket = async () =>  {
    const bucket = getStorage().bucket();
    const file = bucket.file('images/test/jpg');
    return await getDownloadURL(file);
}
