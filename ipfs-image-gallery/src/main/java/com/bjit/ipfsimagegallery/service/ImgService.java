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
    ResponseEntity<Object> loadFile(String name);


}
