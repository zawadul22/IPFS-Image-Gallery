package com.bjit.ipfsimagegallery.service;

import com.bjit.ipfsimagegallery.config.FirebaseConfig;
import com.bjit.ipfsimagegallery.config.IPFSConfig;
import com.bjit.ipfsimagegallery.model.Updater;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import io.ipfs.api.IPFS;
import io.ipfs.api.MerkleNode;
import io.ipfs.api.NamedStreamable;
import io.ipfs.multihash.Multihash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ExecutionException;

@Service
public class ImgServiceImpl implements ImgService{
    
    @Autowired
    private IPFSConfig ipfsConfig;

    @Autowired
    private FirebaseConfig firebaseConfig;

    @Override
    public ResponseEntity<Object> saveFile(MultipartFile file, String name) {
        try{
            InputStream stream = new ByteArrayInputStream(file.getBytes());
            NamedStreamable.InputStreamWrapper inputStreamWrapper = new NamedStreamable.InputStreamWrapper(stream);
            IPFS ipfs = ipfsConfig.ipfs;
            DocumentReference docRef = firebaseConfig.db.collection("users").document(name);
            MerkleNode merkleNode =  ipfs.add(inputStreamWrapper).get(0);
            ApiFuture<DocumentSnapshot> future = firebaseConfig.db.collection("users").document(name).get();
            DocumentSnapshot document = future.get();

            if(Objects.requireNonNull(document.getData()).containsValue(merkleNode.hash.toBase58())){
                return ResponseEntity.status(HttpStatus.CONFLICT).body("You have already uploaded this photo");
            }

            if(docRef.get().get().exists()){
                Map<String,String> update = new HashMap<>();
//                ApiFuture<DocumentSnapshot> future = firebaseConfig.db.collection("users").document(name).get();
//                DocumentSnapshot documentSnapshot = future.get();
                String length = Integer.toString(Objects.requireNonNull(document.getData()).size());
                System.out.println(Objects.requireNonNull(document.getData()).size());
                update.put(length,merkleNode.hash.toBase58());
                ApiFuture<WriteResult> writeResult = firebaseConfig.db.collection("users").document(name).set(update, SetOptions.merge());
                return ResponseEntity.status(HttpStatus.OK).body("Uploaded Successfully "+merkleNode.hash.toBase58());
            }
            else {
                Map<String, String> docData = new HashMap<>();
                docData.put("0", merkleNode.hash.toBase58());
                ApiFuture<WriteResult> futureWrite = firebaseConfig.db.collection("users").document(name).set(docData);
                return ResponseEntity.status(HttpStatus.OK).body("Uploaded Successfully ");
            }


        }catch (Exception e){
            throw new RuntimeException("An error occurred ",e);
        }
    }

    @Override
    public ResponseEntity<ArrayList<byte[]>> loadFile(String hash) {
        try {
            IPFS ipfs = ipfsConfig.ipfs;
            ApiFuture<DocumentSnapshot> future = firebaseConfig.db.collection("users").document("eJs465YLEUexVmYZ1HOt53ukEBu1").get();
            DocumentSnapshot document = future.get();
            ArrayList<Object> cidList = new ArrayList<>(Objects.requireNonNull(document.getData()).values());
            ArrayList<byte[]> imageList = new ArrayList<>();
            ArrayList<Multihash> filePointerList = new ArrayList<>();
            for(int i=0; i<cidList.size(); i++){
                filePointerList.add(Multihash.fromBase58(cidList.get(i).toString()));
                imageList.add(ipfs.cat(filePointerList.get(i)));
            }
//            Multihash filePointer = Multihash.fromBase58(hash);
            return ResponseEntity.status(HttpStatus.OK).body(imageList);

        } catch (Exception e){
            throw new RuntimeException("An error occurred ",e);
        }
    }

    @Override
    public boolean getDocument(String name) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firebaseConfig.db.collection("users").document(name);
//        System.out.println("Doc ID "+docRef.toString());
        return docRef.get().get().exists();
    }

    @Override
    public ResponseEntity<Object> update(Updater updater) throws ExecutionException, InterruptedException {
        Map<String,String> update = new HashMap<>();
        update.put(updater.getSerial(), updater.getCid());
        ApiFuture<WriteResult> writeResult = firebaseConfig.db.collection("users").document("user1").set(update, SetOptions.merge());
        ApiFuture<DocumentSnapshot> future = firebaseConfig.db.collection("users").document("user1").get();
        DocumentSnapshot document = future.get();
//        Integer length = future.get().;
        return ResponseEntity.status(HttpStatus.OK).body(Objects.requireNonNull(document.getData()).size());
    }

    @Override
    public ResponseEntity<Object> checkCID(String cid) throws ExecutionException, InterruptedException {
        ApiFuture<DocumentSnapshot> future = firebaseConfig.db.collection("users").document("eJs465YLEUexVmYZ1HOt53ukEBu1").get();
        DocumentSnapshot document = future.get();
        System.out.println(Objects.requireNonNull(document.getData()).containsValue(cid));
//        System.out.println(document.contains(cid));
        if(document.contains("0")){
            return ResponseEntity.status(HttpStatus.OK).body(true);
        }
        else {
            return ResponseEntity.status(HttpStatus.OK).body(false);
        }

    }
}
