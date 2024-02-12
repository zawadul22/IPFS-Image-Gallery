package com.bjit.ipfsimagegallery.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Data
@Setter
@Getter
public class Updater {
    private String serial;
    private String cid;
}
