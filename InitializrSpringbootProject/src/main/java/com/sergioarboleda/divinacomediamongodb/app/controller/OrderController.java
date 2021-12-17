/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sergioarboleda.divinacomediamongodb.app.controller;

import com.sergioarboleda.divinacomediamongodb.app.model.Order;
import com.sergioarboleda.divinacomediamongodb.app.service.OrderService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Daniel
 */
@RestController
@RequestMapping("order")
@CrossOrigin(origins = "*")
public class OrderController {
    @Autowired
    private OrderService service;
    
    @GetMapping("/all")
    public List<Order> getUsers(){
        return service.getAll();
    }
    
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Order save(@RequestBody Order order){
        return service.save(order);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Order update(@RequestBody Order order){
        return service.update(order);
    }
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Integer id){
        service.delete(id);
    }
    
    @GetMapping("/{id}")
    public Optional<Order> getOrderById(@PathVariable("id") Integer id){
        return service.findById(id);
    }
    
    @GetMapping("/zona/{zone}")
    public List<Order> getOrderByZone(@PathVariable("zone") String zone){
        return service.getOrderByZone(zone);
    }
    
    @GetMapping("/salesman/{id}")
    public List<Order> getOrderByAseId(@PathVariable("id") Integer id){
        return service.getOrderBySalesManId(id);
    }
    
    @GetMapping("/date/{date}/{id}")
    public List<Order> getOrderByRegisterDay(@PathVariable("date") String registerDay, @PathVariable("id") Integer id) throws ParseException{
        
        return service.getOrderByRegisterDay(registerDay, id);
    }
    
    @GetMapping("/state/{state}/{id}")
    public List<Order> getOrderByState(@PathVariable("state") String state, @PathVariable("id") Integer id){
        return service.getOrderByStatus(state, id);
    }
}
