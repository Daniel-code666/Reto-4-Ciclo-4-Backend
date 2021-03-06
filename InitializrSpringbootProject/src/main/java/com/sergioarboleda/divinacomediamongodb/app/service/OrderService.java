/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sergioarboleda.divinacomediamongodb.app.service;

import com.sergioarboleda.divinacomediamongodb.app.model.Order;
import com.sergioarboleda.divinacomediamongodb.app.repositories.OrderRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Daniel
 */
@Service
public class OrderService {
    @Autowired
    private OrderRepository repository;
    
    public List<Order> getAll(){
        return repository.getAll();
    }
    
    public Order save(Order order){
        Optional<Order> orderIdMax = repository.lastUserId();
        
        //si el id de la orden que se recibe como parametro es nulo, entonces valida el maximo id existente en base de datos
        if (order.getId() == null) {
            //valida el maximo id generado, si no hay ninguno aun el primer id sera 1
            if (!orderIdMax.isPresent()){
                order.setId(1);
            //si retorna informacion suma 1 al maximo id existente y lo asigna como el codigo de la orden
            }else{
                order.setId(orderIdMax.get().getId() + 1);
            }
        }
        
        Optional<Order> e = repository.getOrderById(order.getId());
        if (e.isPresent()) {
            return order;       
        }else{
            return repository.save(order);
        } 
    }
    
    public Order update(Order order){
        if (order.getId() != null) {
            Optional<Order> orderDb = repository.getOrderById(order.getId());
            if(orderDb.isPresent()){
                if (order.getStatus() != null) {
                    orderDb.get().setStatus(order.getStatus());
                }
                repository.update(orderDb.get());
                return orderDb.get();
            }else{
                return order;
            }
        } else {
            return order;
        }
    }
    
    public void delete(Integer id){
//        if (repository.getByRef(id).isPresent()){
//            repository.delete(id);
//        }
        repository.delete(id);
    }
    
    public Optional<Order> findById(Integer id){
        return repository.getById(id);
    }
    
    public List<Order> getOrderByZone(String zone){
        return repository.getOrderByZone(zone);
    }
    
    public List<Order> getOrderBySalesManId(Integer id){
        return repository.getOrderByAseID(id);
    }
    
    public List<Order> getOrderByRegisterDay(String registerDay, Integer id) throws ParseException{
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        String dateFormat = registerDay;
        Date date = formatter.parse(dateFormat);
        
        DateTimeFormatter f = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate fechaActual = LocalDate.parse(registerDay, f);
        Date fecha1 = Date.from(fechaActual.plusDays(1).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
        Date fecha2 = Date.from(fechaActual.minusDays(1).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
        return repository.getOrderByRegisterDay(fecha2, fecha1, id);
    }
    
    public List<Order> getOrderByStatus(String status, Integer id){
        return repository.getOrderByStatusAndId(status, id);
    }
}
