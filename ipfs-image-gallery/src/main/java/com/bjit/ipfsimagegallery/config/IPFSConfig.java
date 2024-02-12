package com.bjit.ipfsimagegallery.config;

import io.ipfs.api.IPFS;
import org.springframework.stereotype.Component;


@Component
public class IPFSConfig {

    public IPFS ipfs;
    public IPFSConfig(){
        ipfs = new IPFS("/ip4/127.0.0.1/tcp/5001");
    }

}
