<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from "vue"
import axios from "axios"
import { createSocket, destroySocket } from "./socket/index"

const api = axios.create({
    baseURL: "http://localhost:3000",
})

// 替换你的秘钥
const appKey = ref("")
const appSecret = ref("")
// 替换你的主播身份码
const codeId = ref("")
// 替换你的app应用 [这里测试为互动游戏]
const appId = ref("")
// [向 node server请求接口后自动返回]
const gameId = ref("")
// v2改为server response 服务器返回websocket信息，而非手动获取
const authBody = ref("")
const wssLinks = ref([])
// heartBeat Timer
const heartBeatTimer = ref<NodeJS.Timer>()
// be ready
clearInterval(heartBeatTimer.value!)
/**
 * 测试请求鉴权接口
 */
const getAuth = () => {
    api.post("/getAuth", {
        appKey: appKey.value,
        appSecret: appSecret.value,
    })
        .then(({ data }) => {
            console.log("-----鉴权成功-----")
            console.log("返回：", data)
        })
        .catch((err) => {
            console.log("-----鉴权失败-----")
        })
}

const heartBeatThis = (game_id) => {
    // 心跳 是否成功
    api.post("/gameHeartBeat", {
        game_id,
    })
        .then(({ data }) => {
            console.log("-----心跳成功-----")
            console.log("返回：", data)
        })
        .catch((err) => {
            console.log("-----心跳失败-----")
        })
}

/**
 * @comment 注意所有的接口基于鉴权成功后才能正确返回
 * 测试请求游戏开启接口
 */
const gameStart = () => {
    api.post("/gameStart", {
        code: codeId.value,
        app_id: Number(appId.value),
    })
        .then(({ data }) => {
            if (data.code === 0) {
                const res = data.data
                const { game_info, websocket_info } = res
                const { auth_body, wss_link } = websocket_info
                authBody.value = auth_body
                wssLinks.value = wss_link
                console.log("-----游戏开始成功-----")
                console.log("返回GameId：", game_info)
                gameId.value = game_info.game_id
                // v2改为20s请求心跳一次，不然60s会自动关闭
                heartBeatTimer.value = setInterval(() => {
                    heartBeatThis(game_info.game_id)
                }, 20000)
            } else {
                console.log("-----游戏开始失败-----")
                console.log("原因：", data)
            }
        })
        .catch((err) => {
            console.log("-----游戏开始失败-----")
            console.log(err)
        })
}

/**
 * @comment 基于gameStart成功后才会关闭正常，否则获取不到game_id
 * 测试请求游戏关闭接口
 */
const gameEnd = () => {
    api.post("/gameEnd", {
        game_id: gameId.value,
        app_id: Number(appId.value),
    })
        .then(({ data }) => {
            if (data.code === 0) {
                console.log("-----游戏关闭成功-----")
                console.log("返回：", data)
                // 清空长链
                authBody.value = ""
                wssLinks.value = []
                clearInterval(heartBeatTimer.value)
                handleDestroySocket()
                console.log("-----心跳关闭成功-----")
            } else {
                console.log("-----游戏关闭失败-----")
                console.log("原因：", data)
            }
        })
        .catch((err) => {
            console.log("-----游戏关闭失败-----")
            console.log(err)
        })
}

/**
 * 测试创建长长连接接口
 */
const handleCreateSocket = () => {
    if (authBody.value && wssLinks.value) {
        createSocket(authBody.value, wssLinks.value)
    }
}

/**
 * 测试销毁长长连接接口
 */
const handleDestroySocket = () => {
    destroySocket()
    console.log("-----长连接销毁成功-----")
}
</script>

<template>
    <div>
        <h3>-- !-- 所有输出信息都在控制台 -- --</h3>
        <div>鉴权部分</div>
        <div class="form">
            <input
                type="text"
                placeholder="填写access_key_id"
                v-model="appKey"
            />
            <input
                type="text"
                placeholder="填写access_key_secret"
                v-model="appSecret"
            />
            <button @click="getAuth">鉴权</button>
        </div>

        <hr />
        <div>程序开启部分 [需要先鉴权]</div>
        <div class="form">
            <input type="text" placeholder="填写主播身份码" v-model="codeId" />
            <input type="text" placeholder="填写 app_id" v-model="appId" />
            <button @click="gameStart">游戏开始</button>
            <button @click="gameEnd">游戏结束</button>
        </div>

        <hr />
        <div>长连接部分 [需要先游戏开启]</div>
        <div class="form">
            <button @click="handleCreateSocket">建立长连接</button>
            <button @click="handleDestroySocket">销毁长连接</button>
        </div>
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.form {
    display: flex;
    flex-direction: column;
}
.form input,
.form button {
    width: 400px;
    height: 50px;
    margin: 10px 0;
}
</style>
