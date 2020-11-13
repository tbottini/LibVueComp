import axios from 'axios';

export const state = () => ({
    user: null,
    msgApi: null,
    elemSelect: null,
})

export const getters = {
    user: (state) => () => state["user"],
    isAdmin: (state) => () => { return state["user"] && state["user"].isAdmin},
    msgApi: state => () => state.msgApi,
}

export const mutations = {
    login (state, u)
    {
        state.user = u;
        state.user.isAdmin = !!u.isAdmin;
    },
    logout(state)
    {
        state.user = {};
    },
    setMsgApi(state, msgApi)
    {
        state.msgApi = msgApi;
    },
    popMsgApi(state)
    {  
        var tmp = state.msg; 
        state.error = null;
        return tmp;
    },
    disconnect(state)
    {
        state.user = {};
    },
}

export const actions = {
    async login({ commit, state }, params)
    {
        await axios.post('/api/users/login', {
            email: params.username,
            password: params.password
        })
        .then(data => {
            console.log(data.data);
            commit('setMsgApi', data.data);
            if (!data.data.error)
            {
                commit('login', data.data);
            }
        }) 
    },
    async self({ commit, state })
    {
        await axios.get('/api/users/self',
        {
            withCredentials: true
        })
        .then(data => {
            if (!data.data.error)
            {
                commit('login', data.data);
            }
        })
    },
    async logout({commit, state})
    {
        await axios.get('/api/users/logout')
        .then(data => {
            if (!data.data.error)
            {
                commit('logout');
            }
        })
    }
}