<template>
    <div>
        <template v-if="mail">
            <MailComposer v-if="mail.draft" :mail="mail" />
            <MailPrinter v-else :mail="mail" />
        </template>

    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {

        this.$axios.get("/api/contact/" + this.$route.params.id)
        .then(r => {
            r = r.data;
            console.log(r);
            this.mail = r;
        });

        return {
            mail: null,
        }
    },
}
</script>