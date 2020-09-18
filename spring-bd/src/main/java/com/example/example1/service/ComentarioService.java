package com.example.example1.service;

import com.example.example1.exceptions.NotFoundException;
import com.example.example1.model.Comentario;
import com.example.example1.model.ComentarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * EmployeeService
 */
@RestController
@CrossOrigin(origins = "*")
public class ComentarioService {

    @Autowired
    ComentarioRepository repository;

    @GetMapping("/comentarios")
    Iterable<Comentario> getComentarios() {
        return repository.findAll();
    }
}
