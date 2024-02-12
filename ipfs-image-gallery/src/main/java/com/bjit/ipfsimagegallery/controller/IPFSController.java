package com.bjit.ipfsimagegallery.controller;

import com.bjit.ipfsimagegallery.model.Updater;
import com.bjit.ipfsimagegallery.service.ImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

@CrossOrigin
@RestController
@RequestMapping("/files")
public class IPFSController {
    @Autowired
    private ImgService imgService;

    @PostMapping(value = "upload/{name}")
    public ResponseEntity<Object> saveFile(@RequestParam("file") MultipartFile file, @PathVariable("name") String name){
        return imgService.saveFile(file, name);
    }

    @GetMapping(value = "get/{userId}")
    public ResponseEntity<Object> loadFile(@PathVariable("userId") String userId){
        return imgService.loadFile(userId);
    }
    
}
