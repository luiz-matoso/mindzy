package com.luizmatoso.mindzy.repository;

import com.luizmatoso.mindzy.model.GeneratedAnswer;
import com.luizmatoso.mindzy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GeneratedAnswerRepository extends JpaRepository<GeneratedAnswer, UUID> {

    List<GeneratedAnswer> findByUserOrderByCreatedAtDesc(User user);

}
