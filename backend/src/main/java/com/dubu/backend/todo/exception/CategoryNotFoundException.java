package com.dubu.backend.todo.exception;

import com.dubu.backend.global.exception.NotFoundException;

import static com.dubu.backend.global.exception.ErrorCode.CATEGORY_NOT_FOUND;

public class CategoryNotFoundException extends NotFoundException {
  public CategoryNotFoundException(String categoryName) {
    super(CATEGORY_NOT_FOUND.getMessage().formatted(categoryName));
  }

  @Override
  public String getErrorCode() {
    return CATEGORY_NOT_FOUND.name();
  }
}