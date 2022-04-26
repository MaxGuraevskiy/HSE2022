package com.skiboards.skiesboards.service;

import com.skiboards.skiesboards.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {  //security
    boolean save(UserDTO userDTO);
}
