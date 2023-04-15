<template>
  <div class="sell-flame">
    <form @submit.prevent="submitForm">
      <div class="group group-name">
        <label>
          商品名:
          <input type="text" name="name" v-model="name" required />
        </label>
      </div>
      <div class="group group-author">
        <label>
          著者名:
          <input type="text" name="author" v-model="author" required />
        </label>
      </div>
      <div class="group group-image">
        <label>
          商品画像:
          <input
            type="file"
            accept="image/*"
            name="image"
            @change="handleImageUpload"
            required
          />
        </label>
      </div>
      <div class="group group-quality">
        <label>
          品質評価:
          <select name="quality" v-model="quality" required>
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="1">★☆☆☆☆</option>
          </select>
        </label>
      </div>
      <div class="group group-remark">
        <label>
          備考:
          <textarea
            name="remark"
            rows="5"
            cols="30"
            v-model="remark"
          ></textarea>
        </label>
      </div>
      <div class="group group-tags">
        <label>タグ:</label>
        <label>
          <input
            type="checkbox"
            name="Coverless"
            v-model="tags.Coverless"
          />カバーなし
        </label>
        <label>
          <input type="checkbox" name="Crease" v-model="tags.Crease" />シワあり
        </label>
        <label>
          <input type="checkbox" name="Dirty" v-model="tags.Dirty" />汚れあり
        </label>
        <label>
          <input
            type="checkbox"
            name="Written"
            v-model="tags.Written"
          />書き込みあり
        </label>
      </div>
      <div class="submit-button">
        <button type="submit">登録</button>
      </div>
    </form>
    <div class="disp-registered-products"></div>
    <div class="disp-traded-products"></div>
  </div>
</template>

<script>
export default {
  name: "SellView",
  data() {
    return {
      name: "",
      author: "",
      image: null,
      quality: null,
      remark: "",
      tags: {
        Coverless: false,
        Crease: false,
        Dirty: false,
        Written: false,
      },
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result;
      };
      reader.readAsDataURL(file);
    },
    async submitForm() {
      try {
        // Firestoreに登録するデータを設定
        const newProductData = {
          name: this.name,
          author: this.author,
          image: this.image,
          quality: this.quality,
          remark: this.remark,
          tags: this.tags,
        };
        // Firestoreにデータを登録し, vuexストアとrealtime databaseにProductIDを記憶
        await this.$store.dispatch("addProduct", newProductData);
        // 登録完了メッセージを表示
        console.log("商品が登録されました");
        this.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
    resetForm: function () {
      // フォームを初期化
      this.name = "";
      this.author = "";
      this.image = null;
      this.quality = null;
      this.remark = "";
      this.tags = {
        Coverless: false,
        Crease: false,
        Dirty: false,
        Written: false,
      };
    },
  },
  // このページを開いたら商品データを取得する
  computed: {
    registeredProductIDs() {
      return this.$store.state.userData.RegisteredProductIDs;
    },
  },
  async created() {
    await this.$store.dispatch("fetchProductsByIDs", this.registeredProductIDs);
  },
};
</script>
