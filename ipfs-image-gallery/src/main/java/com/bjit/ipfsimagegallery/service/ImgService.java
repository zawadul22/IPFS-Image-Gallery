package com.bjit.ipfsimagegallery.service;

import com.bjit.ipfsimagegallery.model.Updater;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Objects;
import java.util.concurrent.ExecutionException;

@Service
public interface ImgService {

    ResponseEntity<Object> saveFile(MultipartFile file, String name);
    ResponseEntity<ArrayList<byte[]>> loadFile(String hash);
    boolean getDocument(String name) throws ExecutionException, InterruptedException;
    ResponseEntity<Object> update(Updater updater) throws ExecutionException, InterruptedException;
    ResponseEntity<Object> checkCID(String cid) throws ExecutionException, InterruptedException;

}
