<template>
  <v-dialog v-model="showDialog" max-width="560">
    <v-card>
      <v-card-text>
        <h2>{{ tl('rename_novel') }}</h2>
        <div class="section-block">
          <h3>{{ tl('quick_picks') }}</h3>
          <v-btn
            small
            v-for="meta in metasConfig"
            :key="meta.value"
            :ripple="false"
            color="info"
            @click="pickMeta(meta)"
          >{{ meta.title }}</v-btn>
        </div>
        <div class="section-block">
          <h3>{{ tl('rename_format') }}</h3>
          <v-text-field
            class="v-input-first"
            ref="renameInput"
            v-model="renameFormat"
            placeholder="Not set"
            :hint="tl('novel_rename_hint')"
            :persistent-hint=true
            @focus="updateInputPos"
            @keyup="updateInputPos"
            @click="updateInputPos"
          ></v-text-field>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import renameFormatMixin from '@@/mixins/renameFormatMixin';

export default {
  name: "RenameUgoiraDialog",

  mixins: [
    renameFormatMixin
  ],

  data() {
    return {
      showDialog: true,
      metasConfig: [
        {
          title: this.tl("id"),
          holder: "{id}"
        },
        {
          title: this.tl("title"),
          holder: "{title}"
        },
        {
          title: this.tl("author"),
          holder: "{author}"
        },
        {
          title: this.tl("author_id"),
          holder: "{authorId}"
        },
        {
          title: this.tl("year"),
          holder: "{year}"
        },
        {
          title: this.tl("month"),
          holder: "{month}"
        },
        {
          title: this.tl("day"),
          holder: "{day}"
        },
        {
          title: this.tl("_series_id"),
          holder: "{seriesId}"
        },
        {
          title: this.tl("_series_title"),
          holder: "{seriesTitle}"
        },
        {
          title: this.tl("_series_order"),
          holder: "{seriesOrder}"
        }
      ]
    };
  },

  watch: {
    showDialog: function(val) {
      if (!!val === false) {
        this.$router.go(-1);
      }
    },

    renameFormat: function(val) {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }

        this.saveTimeout = setTimeout(() => {
            browser.storage.local.set({
                novelRenameFormat: val
            });
        }, 300);
    }
  },

  mounted() {
    this.renameFormat = this.browserItems.novelRenameFormat;
  },

  methods: {
    pickMeta: function(meta) {
      this.updateFormat(meta.holder);
      this.setInputCursor(this.$refs.renameInput.$refs.input, meta.holder);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  margin-left: 0;
  margin-right: 16px;
}
h3 {
  font-size: 1.2em;
  padding: 10px 0;
}
v-input {
  margin-top: 0;
}
</style>
