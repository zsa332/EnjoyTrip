<script setup>

const props = defineProps(["msg", "isMe"]);

const getMessageTime = (createAt) => {
    return createAt.substring(11, 16)
}
</script>

<template>
    <div :class="props.isMe ? 'chat-message-line-right' : 'chat-message-line-left'">
        <div class="chat-message-block">
            <div :class="props.isMe ? 'chat-message-name-right' : 'chat-message-name'">
                <p style="font-size: 10px; height: 8px;">{{ props.msg.userName }}</p>
            </div>
            <div :class="props.isMe ? 'chat-message-content-block-right' : 'chat-message-content-block'">
                <div class="chat-message-time" v-if="props.isMe">{{
                    getMessageTime(props.msg.createAt) }}</div>
                <div class="chat-message-content">
                    {{ props.msg.message }}
                </div>
                <div class="chat-message-time" v-if="!props.isMe">{{
                    getMessageTime(props.msg.createAt) }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chat-message-line-left {
    display: flex;
    justify-content: flex-start;
    width: 100%;
}

.chat-message-line-right {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.chat-message-block {
    /* border: 1px solid; */
    width: 100px;
}


.chat-message-name-right {
    display: flex;
    justify-content: flex-end;
}

.chat-message-content-block {
    display: flex;
    align-items: end;
}

.chat-message-content-block-right {
    display: flex;
    justify-content: flex-end;
    align-items: end;
}

.chat-message-content {
    border-radius: 10%;
    background-color: white;
    color: black;
    padding: 5px;
}

.chat-message-time {
    width: auto;
    font-size: 8px;
}
</style>