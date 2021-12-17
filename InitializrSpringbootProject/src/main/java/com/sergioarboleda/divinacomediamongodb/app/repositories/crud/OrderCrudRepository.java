/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sergioarboleda.divinacomediamongodb.app.repositories.crud;

import com.sergioarboleda.divinacomediamongodb.app.model.Order;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

/**
 *
 * @author Daniel
 */
public interface OrderCrudRepository extends MongoRepository<Order, Integer>{    
    @Query("{'salesMan.zone': ?0}")
    List<Order> findByZone(final String zone);
    
    @Query("{status: ?0}")
    List<Order> findByStatus(final String status);
    
    Optional<Order> findTopByOrderByIdDesc();
    
    @Query("{'salesMan.id': ?0}")
    List<Order> findBySalesManId(final Integer id);
    
    List<Order> findByRegisterDayAndSalesMan_Id(Date registerDay, Integer id);
    
    public List<Order> findByRegisterDayBetweenAndSalesMan_Id(Date registerDay_1, Date registerDay_2, Integer id);
    
    List<Order> findByStatusAndSalesMan_Id(String status, Integer id);
}
