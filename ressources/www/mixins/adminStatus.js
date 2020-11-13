//mixins for handle admin status
//for components

export default {
    data()
    {
        return {
            
        }
    },
    computed: {
        isAdmin() {
            if (!this.$store.state.user)
                return false;
            return this.$store.state.user.isAdmin;
        }
    },
}