package com.dubu.backend.global.exception;

public abstract class InternalServerException extends RuntimeException {

  public InternalServerException(String message) {
    super(message);
  }
}