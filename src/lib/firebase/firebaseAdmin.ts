import admin from 'firebase-admin';

type FirebaseAdminAppParams = {
    projectId: string;
    clientEmail: string;
    storageBucket: string;
    privateKey: string;
}

function formatPrivateKey(privateKey: string): string {
    return privateKey.replace(/\\n/g, '\n').replace(/(^"|"$)/g, '');
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
    const privateKey = formatPrivateKey(params.privateKey);
    console.log(privateKey)
    if (admin.apps.length > 0) {
        return admin.app();
    }

    const cert = admin.credential.cert('service-account-key.json');

    console.log(cert);

    return admin.initializeApp({
        credential: cert,
        projectId: 'almacen-renzito',
        storageBucket: 'almacen-renzito.firebasestorage.app'
    })
}

export async function initAdmin() {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL as string;
    // const storageBucket = `${projectId}.appspot.com` as string;
    const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY as string;

    if (!projectId || !clientEmail || !storageBucket || !privateKey) {
        throw new Error('Missing Firebase Admin environment variables');
    }

    return createFirebaseAdminApp({
        projectId,
        clientEmail,
        storageBucket,
        privateKey
    });
}

