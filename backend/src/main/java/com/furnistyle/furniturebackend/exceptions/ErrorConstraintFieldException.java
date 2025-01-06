package com.furnistyle.furniturebackend.exceptions;

public class ErrorConstraintFieldException extends RuntimeException {
    final String message;

    public ErrorConstraintFieldException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
