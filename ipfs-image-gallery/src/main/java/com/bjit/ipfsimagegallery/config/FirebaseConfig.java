package com.bjit.ipfsimagegallery.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.util.Objects;

@Component
public class FirebaseConfig {

    public Firestore db;
    public FirebaseConfig(){
        try{
            ClassLoader classLoader = FirebaseConfig.class.getClassLoader();
            File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json").getFile()));
            FileInputStream serviceAccount = new FileInputStream(file);
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setServiceAccountId("firebase-adminsdk-353j4@ipfs-image-gallery.iam.gserviceaccount.com")
                    .build();
            FirebaseApp.initializeApp(options);
            db = FirestoreClient.getFirestore();
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}
