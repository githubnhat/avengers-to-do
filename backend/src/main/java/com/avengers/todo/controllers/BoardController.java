package com.avengers.todo.controllers;

import com.avengers.todo.common.Constant;
import com.avengers.todo.common.ErrorResponse;
import com.avengers.todo.payloads.GetBoardIdResponse;
import com.avengers.todo.payloads.HandleBoard;
import com.avengers.todo.payloads.PageResponse;
import com.avengers.todo.payloads.ResponseObject;
import com.avengers.todo.services.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.avengers.todo.payloads.PagesRequest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/boards")
@Slf4j
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody HandleBoard request) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Query Create Board Successfully", boardService.create(request)));
        } catch (Exception ex) {
            log.error("API /api/v1/boards: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("failed", "Cannot Create", ""));
        }
    }

    @PostMapping("/listBoards")
    public ResponseEntity<?> getAll(@RequestBody PagesRequest request) {
        try {
            PageResponse<GetBoardIdResponse> response = new PageResponse<>();
            response.setPage(request.getPage());
            Pageable pageable;
            if (request.getSortBy() != null) {
                Sort sort = request.getSortDesc()== -1 ? Sort.by(request.getSortBy()).descending() :
                        Sort.by(request.getSortBy()).ascending();
                pageable = PageRequest.of(request.getPage() - 1, request.getLimit(), sort);
            } else {
                pageable = PageRequest.of(request.getPage() - 1, request.getLimit(),
                        Sort.by("created_date").descending());
            }
            int totalItem = boardService.totalItem();
            response.setTotalItems(totalItem);
            response.setTotalPages((int) Math.ceil((double) (totalItem) / request.getLimit()));
            List<GetBoardIdResponse> boards = boardService.getAll(pageable);
            response.setData(boards);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Query Create Board Successfully", response));
        } catch (Exception ex) {
            log.error("API /api/v1/boards: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(boardService.getById(id));
        } catch (Exception ex) {
            log.error("API /api/v1/boards/id: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody HandleBoard request, @PathVariable Long id) {
        try {
            return ResponseEntity.ok(boardService.update(request, id));
        } catch (Exception ex) {
            log.error("API update/boards", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            boardService.delete(id);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Delete Success", ""));
        } catch (Exception ex) {
            log.error("Delete Board", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("FAILED", "Cannot Delete", ""));
        }
    }

    @GetMapping("/{id}/users")
    public ResponseEntity<?> getUsersInBoard(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(boardService.getUsersInBoard(id));
        } catch (IllegalStateException e) {
            log.error("API getUsersInBoard /api/v1/boards/{id}/users: ", e);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(e.getMessage()).build());
        } catch (Exception ex) {
            log.error("API getUsersInBoard /api/v1/boards/{id}/users: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message("Server error").build());
        }
    }
}
