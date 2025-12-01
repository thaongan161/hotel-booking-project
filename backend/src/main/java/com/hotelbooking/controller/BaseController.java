// src/main/java/com/hotelbooking/controller/BaseController.java
package com.hotelbooking.controller;

import com.hotelbooking.entity.Hotel;
import com.hotelbooking.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ResponseStatusException;

public abstract class BaseController {

    protected User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    protected void verifyOwnership(Hotel hotel) {
        User currentUser = getCurrentUser();
        if (!hotel.getOwner().getUserId().equals(currentUser.getUserId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You don't have permission to modify this hotel.");
        }
    }
}
