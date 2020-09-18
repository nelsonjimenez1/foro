package com.example.example1.service;

import com.example.example1.exceptions.NotFoundException;
import com.example.example1.model.Foro;
import com.example.example1.model.ForoRepository;

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
 * ForoService
 */
@RestController
@CrossOrigin(origins = "*")
public class ForoService {

    @Autowired
    ForoRepository repository;

    @GetMapping("/foros")
    Iterable<Foro> getForos() {
        return repository.findAll();
    }

    @GetMapping("/foros/{id}")
    Foro findForo(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Foro not found"));
    }

    @PostMapping("/foros")
    Foro createForo(@RequestBody Foro foro) {
        return repository.save(foro);
    }    
}
