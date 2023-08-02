//小仓库：layout组件相关配置仓库

import {defineStore} from "pinia";

let useLayOutSettingStore= defineStore('SettingStore', {
    state: ()=> {
        return {
            fold: false, //用户控制菜单折叠
            refresh: false // 刷新
        }
    }
});

export default useLayOutSettingStore;