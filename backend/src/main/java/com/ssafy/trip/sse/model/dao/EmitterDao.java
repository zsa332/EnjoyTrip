package com.ssafy.trip.sse.model.dao;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class EmitterDao{
    // 모든 Emitters를 저장하는 ConcurrentHashMap
    private final Map<Integer, SseEmitter> emitters = new ConcurrentHashMap<>();

    /**
     * 주어진 아이디와 이미터를 저장
     *
     * @param id      - 사용자 아이디.
     * @param emitter - 이벤트 Emitter.
     */
    public void save(int id, SseEmitter emitter) {
        emitters.put(id, emitter);
    }

    /**
     * 주어진 아이디의 Emitter를 제거
     *
     * @param id - 사용자 아이디.
     */
    public void deleteById(int id) {
        emitters.remove(id);
    }

    /**
     * 주어진 아이디의 Emitter를 가져옴.
     *
     * @param id - 사용자 아이디.
     * @return SseEmitter - 이벤트 Emitter.
     */
    public SseEmitter get(int id) {
        return emitters.get(id);
    }
}